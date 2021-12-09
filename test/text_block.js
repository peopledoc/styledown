const setupTestEnv = require('./setup')

describe('Text block', function () {
  setupTestEnv(this)

  it('ignore when no example', function () {
    this.load(`
### Example
hello

hi

world
    `)
    expect(this.$('.sg-block > .sg-text').length).to.equal(0)
    expect(this.$('.sg-block > .sg-text + .sg-example').length).to.equal(0)
  })
  it('should work', function () {
    this.load(`
### Example
hello

hi

world

    @example
    div x
    `)
    expect(this.$('.sg-block').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > h3#example').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > p').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > p+p+p').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text + .sg-example').length).to.not.equal(0)
  })
  it('leave inlines alone', function () {
    this.load(`
### Example

\`a\` - foo *b* **c**

    @example
    div x
    `)
    
    expect(this.$('.sg-block').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > h3#example').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > p').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > p > code').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > p > strong').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > p > em').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text + .sg-example').length).to.not.equal(0)
  })
  it('account for code', function () {
    this.load(`
### Example
hello

hi

world

\`\`\` javascript
alert('ok')
\`\`\`
    `)
    expect(this.$('.sg-block').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > h3#example').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > p').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text > p+p+p').length).to.not.equal(0)
    expect(this.$('.sg-block > .sg-text + pre.sg-code').length).to.not.equal(0)
  })
})
