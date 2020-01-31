const setupTestEnv = require('./setup');

const template = `
### Button

    @example
    a.button
      | Hello
`;

describe('jade', function() {
  setupTestEnv(this);

  beforeEach(function() {
    this.load(template);
  });
  it('sg-canvas', function() {
    expect(this.$(".sg-canvas").length).eql(1);
  });
  it('example rendering', function() {
    expect(this.$("a.button").length).eql(1);
    expect(this.$("a.button").html()).eql("Hello");
  });
});
