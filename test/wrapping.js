const setupTestEnv = require('./setup');

describe('Wrapping', function() {
  setupTestEnv(this);

  it('bare h2', function() {
    this.load("## hello", {
      bare: true
    });
    expect(this.$(".sg-section > h2#hello").length).to.not.equal(0);
    expect(this.$(".sg-section > h2#hello.sg").length).to.not.equal(0);
    expect(this.$(".sg-section.sg-section-hello").length).to.not.equal(0);
    expect(this.$(".sg-section:root").length).to.not.equal(0);
  });
  it('bare h3', function() {
    this.load("### hello", {
      bare: true
    });
    expect(this.$(".sg-block > h3#hello").length).to.not.equal(0);
    expect(this.$(".sg-block > h3#hello.sg").length).to.not.equal(0);
    expect(this.$(".sg-block.sg-section-hello").length).to.not.equal(0);
    expect(this.$(".sg-block:root").length).to.not.equal(0);
  });
  it('mixed case wrapping', function() {
    this.load(`
### button

    @example
    button

## Forms
### input

    @example
    input
    `, {
      bare: true
    });
    
    expect(this.$(".sg-block.sg-section-button > .sg-text > h3#button").length).to.not.equal(0);
    expect(this.$(".sg-block.sg-section-button > .sg-example").length).to.not.equal(0);
    expect(this.$(".sg-section.sg-section-forms").length).to.not.equal(0);
    expect(this.$(".sg-section.sg-section-forms > h2#forms").length).to.not.equal(0);
    expect(this.$(".sg-section.sg-section-forms > .sg-block.sg-section-input").length).to.not.equal(0);
    expect(this.$(".sg-section.sg-section-forms > .sg-block.sg-section-input > .sg-text > h3#input").length).to.not.equal(0);
    
  });
});