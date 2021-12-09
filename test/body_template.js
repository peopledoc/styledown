const setupTestEnv = require('./setup')

describe('Body template test', function () {
  setupTestEnv(this)
  
  beforeEach(function () {
    this.load('## hello', {
      head: ''
    })
  })
  it('wrap in div', function () {
    expect(this.$('body > div').length).to.equal(1)
    expect(this.$).have.selector('body > div > section')
  })
})
