const setupTestEnv = require('./setup')

xdescribe('Default CSS', function () { // skipped
  setupTestEnv(this)

  describe('on', function () {
    beforeEach(function () {
      this.load("### hi")
    })
    it('css', function () {
      expect(this.$).have.selector('link')
      expect(this.$).have.selector('link[rel="stylesheet"][href="styledown.css"]')
    })
    it('js', function () {
      expect(this.$).have.selector('script')
      expect(this.$).have.selector('script[src="styledown.js"]')
    })
  })
  describe('off', function () {
    beforeEach(function () {
      this.load("### hi", {
        head: ''
      })
    })
    it('css', function () {
      expect(this.$).not.have.selector('link[rel="stylesheet"]')
    })
    it('js', function () {
      expect(this.$).not.have.selector('script')
    })
  })
})
