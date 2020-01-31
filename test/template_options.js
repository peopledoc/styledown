const setupTestEnv = require('./setup');

const template = `
# My guides
hello

# Styleguide options
### Template
    <!doctype html>
    <html>
      <woop>
      <head></head>
      <body></body>
    </html>
### Head
    <meta>
`;
describe('Template', function() {
  setupTestEnv(this);

  beforeEach(function() {
    this.load(template);
  });
  it('renders the template', function() {
    expect(this.html).include('<woop>');
  });
});