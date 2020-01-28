const setupTestEnv = require('./setup');
const Cheerio = require('cheerio');

describe('Cheerio:', function() {
  
  setupTestEnv(this);

  it('each', function() {
    let $ = Cheerio.load('<div><h1></h1><p>0</p><p>1</p><span></span></div>');

    $('p').each(function() {
      return $(this).nextUntil('span');
    });
  });
});
