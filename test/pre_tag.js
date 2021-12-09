const setupTestEnv = require('./setup')
const {parseTags, parseCodeText} = require('../lib/utils')

describe('Pre tag', function () {
  setupTestEnv(this)

  describe('parseTags', function () {
    it('key-value', function () {
      let obj = parseTags('name=hello')
      expect(obj.name).eq('hello')
    })
    it('key-value duo', function () {
      let obj = parseTags('name=hello age=2')
      expect(obj.name).eq('hello')
      expect(obj.age).eq('2')
    })
    it('key only', function () {
      let obj = parseTags('isolate')
      expect(obj.isolate).eq(true)
    })
    it('quoted, single', function () {
      let obj = parseTags("name='Johnny Cage'")
      expect(obj.name).eq('Johnny Cage')
    })
    it('quoted, double', function () {
      let obj = parseTags('name="Johnny Cage"')
      expect(obj.name).eq('Johnny Cage')
    })
    it('key + key-value', function () {
      let obj = parseTags('isolate name=hello')
      expect(obj.isolate).eq(true)
      expect(obj.name).eq('hello')
    })
    it('key only, twice', function () {
      let obj = parseTags('isolate no-code')
      expect(obj.isolate).eq(true)
      expect(obj['no-code']).eq(true)
    })
    it('starts with spaces', function () {
      let obj = parseTags('  isolate no-code')
      expect(obj.isolate).eq(true)
      expect(obj['no-code']).eq(true)
    })
    it('multiple', function () {
      let obj = parseTags('example name="Bruce Willis" role=actor')
      expect(obj.example).eq(true)
      expect(obj.name).eq("Bruce Willis")
      expect(obj.role).eq('actor')
    })
    it('classes', function () {
      let obj = parseTags('example .padded')
      expect(obj["class"]).eq('padded')
    })
    it('classes, multiple, spaced', function () {
      let obj = parseTags('example .padded .a .b')
      expect(obj["class"]).eq('padded a b')
    })
    it('classes, multiple, no spaces', function () {
      let obj = parseTags('example .padded.a.b')
      expect(obj["class"]).eq('padded a b')
    })
  })
  describe('parseCodeText', function () {
    it('with tags', function () {
      let out = parseCodeText('@example width=500\ndiv.button')
      expect(out.tag).eql('example width=500')
      expect(out.code).eql('div.button')
    })
    it('no tags', function () {
      let out = parseCodeText('div.button')
      expect(out.tag)["null"]
      expect(out.code).eql('div.button')
    })
  })
  describe('converting examples', function () {
    beforeEach(function () {
      this.load(`
### hello
    @example
    div.button
`)
    })
    it('generates <pre> tags', function () {
      expect(this.$).have.selector('pre')
    })
    it('makes a <pre> HTML code', function () {
      expect(this.$("pre").text()).eql('<div class="button"></div>\n')
    })
  })
})
