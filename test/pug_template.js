const setupTestEnv = require('./setup')

const templateHead = `
hello

# Styleguide options
## Head
    script(src="helloworld.js")
`

const templateBody = `
hello

# Styleguide options
## head
    link
## body
    #hello(sg-content)
`

describe('Pug Templates', function() {
  setupTestEnv(this)

  describe('head', function() {
    beforeEach(function() {
      this.load(templateHead)
    })
    it('render script', function() {
      expect(this.$('script[src="helloworld.js"]')).have.length(1)
    })
  })
  describe('body', function() {
    beforeEach(function() {
      this.load(templateBody)
    })
    it('render body', function() {
      expect(this.$('#hello')).have.length(1)
    })
  })
})
