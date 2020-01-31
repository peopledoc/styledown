const setupTestEnv = require('./setup');


describe('Styledown.defaultconf', function() {
  setupTestEnv(this);
  beforeEach(function() {
    this.conf = Styledown.defaults.conf();
  });
  it('is based on the version', function() {
    var version;
    version = Styledown.version;
    expect(this.conf).include("styledown/v" + version);
  });
  it('works', function() {
    expect(this.conf).be.a('string');
  });
  it('has cdn urls', function() {
    expect(this.conf).include('cdn.rawgit.com/');
  });
});
0