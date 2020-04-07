const Styledown = require('../index')
const {expect } = require('chai')

describe('styledown', function() {
  it('#parse', function() {
    expect(Styledown.parse).to.be.an.instanceOf(Function)
  })
})
