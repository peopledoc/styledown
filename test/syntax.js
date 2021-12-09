const setupTestEnv = require('./setup')

describe('Syntax highlight', function () {
  setupTestEnv(this)

  describe('non-examples', function () {
    beforeEach(function () {
      this.load('``` html\n<div>hello</div>\n```')
    })
    it('intact text', function () {
      expect(this.$('pre').text().trim()).eq("<div>hello</div>")
    })
    it('highlight', function () {
      expect(this.$).have.selector('pre .hljs-tag')
      expect(this.$).have.selector('pre .hljs-name')
    })
    it('set correct pre class', function () {
      expect(this.$).have.selector('pre.sg-language-html')
    })
  })
  describe('examples', function () {
    beforeEach(function () {
      this.load('### Buttons\n\n    @example\n    a.button.primary Primary button\n    a.button.success Success button')
    })
    it('should highlight', function () {
      expect(this.$('.sg-code .hljs-tag').length).gte(4)
      expect(this.$('.sg-code .hljs-string').length).gte(2)
      expect(this.$('.sg-code .hljs-attr').length).gte(2)
      expect(this.$('.sg-code').html()).match(/&lt;/)
    })
  })
})
