const setupTestEnv = require('./setup')

describe('Pretty Print', function() {
  setupTestEnv(this)
  
  describe('default', function() {
    beforeEach(function() {
      this.load("### Hello\n\n    @example\n    div", {
        head: ''
      })
    })
    it('not indent <head>', function() {
      expect(this.html).match(/\n<head/)
    })
    it('not indent <body>', function() {
      expect(this.html).match(/\n<body/)
    })
    it('indent .sg-section-hello', function() {
      expect(this.html).match(/\n {4}<section class="sg-block sg-section-hello/)
    })
    it('indent .sg-canvas', function() {
      expect(this.html).match(/\n {8}<div class="sg-canvas/)
    })
  })
  describe('custom indentSize', function() {
    beforeEach(function() {
      this.load("### Hello\n\n    @example\n    div", {
        indentSize: 4,
        head: ''
      })
    })
    it('should work', function() {})
    it('indent .sg-section-hello', function() {
      expect(this.html).match(/\n {8}<section class="sg-block sg-section-hello/)
    })
    it('indent .sg-canvas', function() {
      expect(this.html).match(/\n {16}<div class="sg-canvas/)
    })
  })
})
