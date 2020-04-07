const Sinon = require('sinon')
const Styledown = require('../index')
const Cheerio = require('cheerio')
const chai = require('chai')
module.exports = function(hooks) {
  global.chai = chai

  global.assert = chai.assert

  global.expect = chai.expect

  chai.should()

  hooks.beforeEach(function() {
    return global.sinon = Sinon.createSandbox()
  })

  hooks.afterEach(function() {
    return global.sinon.restore()
  })

  hooks.beforeAll(function() {
    this.load = function(html, options) {
      if (options == null) {
        options = {}
      }
      if (options.head == null) {
        options.head = false
      }
      this.sd = new Styledown(html, options)
      this.html = this.sd.toHTML()
      return this.$ = Cheerio.load(this.html)
    }
  })

  chai.Assertion.addMethod('htmleql', function(val) {
    let a, b
    a = Cheerio.load(this._obj, {
      normalizeWhitespace: true
    }).html()
    b = Cheerio.load(val, {
      normalizeWhitespace: true
    }).html()
    a = a.replace(/>\s*</g, '><').trim()
    b = b.replace(/>\s*</g, '><').trim()
    return this.assert(a === b, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', b, a, true)
  })

  chai.Assertion.addMethod('selector', function(val) {
    return this.assert(this._obj(val).length > 0, `expected $ to have a selector '${  val  }'`, `expected $ to not have a selector '${  val  }'`, val, this._obj.html())
  })
}
