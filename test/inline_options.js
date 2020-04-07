const setupTestEnv = require('./setup')

const template = `
# My guides
    hello

# Styleguide options
### Head
    <script id="my-script" src="hello.js"></script>
### Body
    <div sg-content id="my-body">
`

describe('Inline Options', function() {
  setupTestEnv(this)

  beforeEach(function() {
    this.load(template)
  })
  // it('no errors', function() {});
  it('should remove config blocks', function() {
    expect(this.$('h2#styleguide-options')).have.length(0)
  })
  it('should have not much', function() {
    expect(this.$('body').text().trim()).match(/^My guides/)
    expect(this.$('body').text().trim()).match(/hello$/)
  })
  it('should render with correct body', function() {
    expect(this.$('#my-body')).have.length(1)
  })
  it('should render with correct head', function() {
    expect(this.$('#my-script')).have.length(1)
  })
})
