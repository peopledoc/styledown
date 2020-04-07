const setupTestEnv = require('./setup')

const template = `
### Buttons
  
    @example
    a.button Hello
  
### Colors
  
    @example
    a.button.primary Primary button
    a.button.success Success button
`

describe('Canvas block', function() {
  setupTestEnv(this)
  beforeEach(function() {
    this.load(template)
  })
  it('sg-code', function() {
    expect(this.$('.sg-code').length).eq(2)
  })
  it('sg-canvas', function() {
    expect(this.$('.sg-canvas').length).eq(2)
  })
  it('block length', function() {
    expect(this.$('.sg-block')).have.length(2)
  })
 
  it('block classnames', function() {
    expect(this.$('.sg-block').eq(0).is('.sg-section-buttons'))["true"]
    expect(this.$('.sg-block').eq(1).is('.sg-section-colors'))["true"]
  })
})
