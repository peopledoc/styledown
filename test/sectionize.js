const setupTestEnv = require('./setup')
const { sectionize } = require('../lib/filters')
const Cheerio = require('cheerio')

function pre(s) {
  return s
}

describe('Sectionize', function() {
  setupTestEnv(this)

  describe('sectionize filter, simple', function() {
    beforeEach(function() {
      this.$ = Cheerio.load(`
        <p>0</p>
        <h2 id='first-section'>First section</h2>
        <p>1a <b>bold</b></p>
        <p>1b</p>
        <p>1c</p>
        <p>1d</p>
        <h2 id='second-section'>Second section</h2>
        <p>2a</p>
        <p>2b</p>
      `, {
        normalizeWhitespace: true
      })
      sectionize(this.$, 'h2', pre, {
        "class": 's2'
      })
    })
    it('left the <p> alone', function() {
      expect(this.$('p:root')).have.length(1)
    })
    it('correct section 1', function() {
      expect(this.$('section')).have.length(2)
      expect(this.$('section.s2')).have.length(2)
      expect(this.$('section.section-first-section')).have.length(1)
    })
    it('section 1 contents', function() {
      expect(this.$('section.section-first-section').text()).eql('First section1a bold1b1c1d')
      expect(this.$('section.section-first-section > h2')).have.length(1)
      expect(this.$('section.section-first-section > p')).have.length(4)
    })
    it('section 2 contents', function() {
      expect(this.$('section.section-second-section').text()).eql('Second section2a2b')
      expect(this.$('section.section-second-section > h2')).have.length(1)
      expect(this.$('section.section-second-section > p')).have.length(2)
    })
  })
  describe('sectionize filter, mixed headings', function() {
    beforeEach(function() {
      this.$ = Cheerio.load(`
      <p>0</p>
      <h3 id='first-section'>First section</h3>
      <p>1a</p>
      <p>1b</p>
      <h2 id='second-section'>Second section</h2>
      <p>2a</p>
      `, {
        normalizeWhitespace: true
      })
      sectionize(this.$, 'h3', pre, {
        "class": 's3'
      })
    })
    it('left the <p> alone', function() {
      expect(this.$('p:root')).have.length(2)
    })
    it('correct section 1', function() {
      expect(this.$('section')).have.length(1)
      expect(this.$('section.s3')).have.length(1)
      expect(this.$('section.section-first-section')).have.length(1)
    })
    it('section 1 contents', function() {
      expect(this.$('section.section-first-section').text()).eql('First section1a1b')
    })
  })
})
