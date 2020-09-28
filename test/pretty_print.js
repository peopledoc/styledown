const { beautifyHTML } = require('../lib/utils')
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

describe('beautifyHTML | Remove trailing slash self closing tags', function(){
  it('Remove trailing slash for img tag', function() {
    let html = beautifyHTML('<img src="foo.bar" alt="Foo image"/>')
    expect(html).match(/<img src="foo.bar" alt="Foo image" >/)
  })
  it("Keep trailing slash for SVG's children tags", function() {
    let html = beautifyHTML(`
    <svg>
      <use xlink:href="../icons.svg#checkmark" href="../icons.svg#checkmark"/>
    </svg>
    `)
    expect(html).match(/<use xlink:href="..\/icons.svg#checkmark" href="..\/icons.svg#checkmark" \/>/)
  })
})
