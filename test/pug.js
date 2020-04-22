const setupTestEnv = require('./setup')

const template = `
### Button

    @example
    img(src="foo.png")
    a.button
      | Hello
`

describe('pug', function() {
  setupTestEnv(this)

  beforeEach(function() {
    this.load(template)
  })
  it('sg-canvas', function() {
    expect(this.$(".sg-canvas").length).eql(1)
  })
  it('example rendering', function() {
    expect(this.$("a.button").length).eql(1)
    expect(this.$("a.button").html()).eql("Hello")
  })

  it('selfclosing html tag has no "/" at the end', function() {
    expect(/\/>/.test(this.html)).eql(false)
    expect(/\/&gt;/.test(this.html)).eql(false)
  })
})
