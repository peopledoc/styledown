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

    it('no indent for <head>', function() {
      expect(this.html).match(/\n<head/)
    })
    it('no indent for <body>', function() {
      expect(this.html).match(/\n<body/)
    })
    it('indent .sg-section-hello', function() {
      expect(this.html).match(/<section class="sg-block sg-section-hello/)
    })
    it('indent .sg-canvas', function() {
      expect(this.html).match(/<div class="sg-canvas/)
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
