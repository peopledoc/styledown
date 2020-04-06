const setupTestEnv = require('./setup')

describe('Tags', function() {
  setupTestEnv(this)
  
  it('one class', function() {
    this.load('### Hello\n\n    @example .white\n    div')
    expect(this.$).have.selector('.sg-example')
    expect(this.$).have.selector('.sg-example.sg-white')
  })
  it('two classes', function() {
    this.load('### Hello\n\n    @example .white .pad\n    div')
    expect(this.$).have.selector('.sg-example')
    expect(this.$).have.selector('.sg-example.sg-white.sg-pad')
  })
})
