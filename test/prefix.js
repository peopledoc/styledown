const setupTestEnv = require('./setup')

describe('Prefix', function () {
  setupTestEnv(this)

  describe('in options', function () {
    beforeEach(function () {
       this.load("## Hello\n### world\nthere", {
        prefix: "styleguide",
        head: ''
      })
    })
    it('classnames in stuff', function () {
      expect(this.$("h2").is('.styleguide')).be["true"]
      expect(this.$("p").is('.styleguide')).be["true"]
    })
    it('classnames in body', function () {
      expect(this.$("html").is('.styleguide')).be["true"]
      expect(this.$("body").is('.styleguide')).be["true"]
    })
    it('h2 section', function () {
      expect(this.$('.styleguide-section-hello')).have.length(1)
    })
    it('h3 section', function () {
      expect(this.$('.styleguide-section-world')).have.length(1)
    })
    it('section', function () {
      expect(this.$('.styleguide-section')).have.length(1)
    })
     it('block', function () {
       expect(this.$('.styleguide-block')).have.length(1)
    })
  })
  describe('inline options', function () {
    beforeEach(function () {
       this.load("## Hello\n### world\nthere\n\n# Styleguide options\n\n* prefix: styleguide", {
        head: ''
      })
    })
    it('classnames in stuff', function () {
      expect(this.$("h2").is('.styleguide')).be["true"]
      expect(this.$("p").is('.styleguide')).be["true"]
    })
    it('classnames in body', function () {
      expect(this.$("html").is('.styleguide')).be["true"]
      expect(this.$("body").is('.styleguide')).be["true"]
    })
    it('h2 section', function () {
      expect(this.$('.styleguide-section-hello')).have.length(1)
    })
    it('h3 section', function () {
      expect(this.$('.styleguide-section-world')).have.length(1)
    })
    it('section', function () {
      expect(this.$('.styleguide-section')).have.length(1)
    })
    it('block', function () {
      expect(this.$('.styleguide-block')).have.length(1)
    })
  })
})
