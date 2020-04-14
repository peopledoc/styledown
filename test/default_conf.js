const setupTestEnv = require('./setup')
const Styledown = require('../index')

describe('Styledown.defaultconf', function() {
  setupTestEnv(this)
  beforeEach(function() {
    this.conf = Styledown.defaults.conf()
  })
  it('js and css are inlined', function() {
    expect(this.conf).include(`<script data-styledownjs>`)
    expect(this.conf).include(`<style data-styledowncss>`)
  })
  it('works', function() {
    expect(this.conf).be.a('string')
  })
})
