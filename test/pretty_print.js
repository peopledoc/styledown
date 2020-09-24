const setupTestEnv = require('./setup')

describe('Pretty Print', function() {
  setupTestEnv(this)

  describe('default', function() {
    beforeEach(function() {
      this.load("### Hello\n\n    @example\n    div", {
        head: ''
      })
    })
    it('indent <head>', function() {
      expect(this.html).match(/\n {2}<head/)
    })
    it('indent <body>', function() {
      expect(this.html).match(/\n {2}<body/)
    })
    it('indent .sg-section-hello', function() {
      expect(this.html).match(/\n {6}<section class="sg-block sg-section-hello/)
    })
    it('indent .sg-canvas', function() {
      expect(this.html).match(/\n {10}<div class="sg-canvas/)
    })
  })
  describe('custom indentSize', function() {
    beforeEach(function() {
      this.load("### Hello\n\n    @example\n    div", {
        tabWidth: 4
      })
    })
    it('indent .sg-section-hello', function() {
      expect(this.html).match(/<section class="sg-block sg-section-hello/)
    })
    it('indent .sg-canvas', function() {
      expect(this.html).match(/\n {8}<div class="sg-canvas/)
    })
  })
})
