const setupTestEnv = require('./setup')

const template = `
# Hello
there
`

describe('Markdown', function() {
  setupTestEnv(this)

  describe('with template', function() {
    beforeEach(function() {
      this.load(template, {
        head: ''
      })
    })
    it('text', function() {
      expect(this.$("h1").text()).eql('Hello')
      expect(this.$("p").text()).eql('there')
    })
    it('classnames', function() {
      expect(this.$).have.selector('h1.sg')
      expect(this.$).have.selector('p.sg')
    })
    it('html template', function() {
      expect(this.html).match(/!DOCTYPE html/)
      expect(this.html).match(/body/)
      expect(this.html).match(/head/)
      expect(this.$).have.selector('meta[charset="utf-8"]')
      expect(this.$("title").text().length).gt(0)
    })
  })
  describe('bare', function() {
    beforeEach(function() {
      this.load(template)
    })
    it('text', function() {
      expect(this.$("h1").text()).eql('Hello')
      expect(this.$("p").text()).eql('there')
    })
    it('classnames', function() {
      expect(this.$).have.selector('h1.sg')
      expect(this.$).have.selector('p.sg')
    })
  })
})
