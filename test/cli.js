const setupTestEnv = require('./setup')
const { run, pipe, success } = require('./helpers/cli')
const {randomfile} = require('./helpers/file')
const fs = require('fs')
const { version } = require('../package.json')
describe('CLI:', function() {
  setupTestEnv(this)

  describe('--help', function() {
    run('--help')
    success()
    it('has no stderr', function() {
      expect(result.stderr).eql('')
    })
    it('shows usage', function() {
      expect(result.out).include('-h, --help')
      expect(result.out).include('print usage information')
    })
  })

  describe('--css', function() {
    run('--css')
    success()
    it('prints css', function() {
      expect(result.out).include('h2.sg')
    })
  })

  describe('--js', function() {
    run('--js')
    success()
    it('prints js', function() {
      expect(result.out).include('document.querySelector')
    })
  })

  describe('--version', function() {
    run('--version')
    success()
    it('prints the version', function() {
      expect(result.out).include(version)
    })
  })

  describe('pipe', function() {
    pipe('### hi\nthere\n')
    success()
    it('works', function() {
      expect(result.out).match(/<h3[^>]*>hi<\/h3>/)
      expect(result.out).match(/<p[^>]*>there<\/p>/)
    })
  })

  describe('pipe --inline', function() {
    pipe("/**\n * hi:\n * there\n */", ['--inline'])
    success()
    it('works', function() {
      expect(result.out).match(/<h3[^>]*>hi<\/h3>/)
      expect(result.out).match(/<p[^>]*>there<\/p>/)
    })
  })

  describe('--output', function() {
    let fname = randomfile()
    run(`test/fixtures/basic/basic-1.md -o ${  fname}`)
    success()
    after(function() {
      if (fs.existsSync(fname)) {
        return fs.unlinkSync(fname)
      }
    })
    it('creates an output file', function() {
      expect(fs.existsSync(fname)).eql(true)
    })

    it('puts things in the output file', function() {
      let data = fs.readFileSync(fname, 'utf-8')
      expect(data).match(/<h3[^>]*>One<\/h3>/)
      expect(data).match(/<p[^>]*>one one one<\/p>/)
    })
    it('prints status in stderr', function() {
      expect(result.stderr).include(fname)
    })
  })

  describe('using a single .md filename', function() {
    run('test/fixtures/basic/basic-1.md')
    success()
    it('works', function() {
      expect(result.out).match(/<h3[^>]*>One<\/h3>/)
      expect(result.out).match(/<p[^>]*>one one one<\/p>/)
    })
  })
  describe('using two .md files', function() {
    run('test/fixtures/basic/basic-1.md test/fixtures/basic/basic-2.md')
    success()
    it('produces output based on the first file', function() {
      expect(result.out).match(/<h3[^>]*>One<\/h3>/)
      expect(result.out).match(/<p[^>]*>one one one<\/p>/)
    })
    it('produces output based on the second file', function() {
      expect(result.out).match(/<h3[^>]*>Two<\/h3>/)
      expect(result.out).match(/<p[^>]*>two two two<\/p>/)
    })
  })
  describe('using .md an .css together', function() {
    run('test/fixtures/basic/basic-1.md test/fixtures/basic/inline.css')
    success()
    it('produces output based on the first file', function() {
      expect(result.out).match(/<h3[^>]*>One<\/h3>/)
      expect(result.out).match(/<p[^>]*>one one one<\/p>/)
    })
    it('produces output based on the second file', function() {
      expect(result.out).match(/<h3[^>]*>Inline<\/h3>/)
      expect(result.out).match(/<p[^>]*>inline inline inline<\/p>/)
    })
  })

  describe('can use Pug import feature', function() {
    run('test/fixtures/include/readme.md')
    success()
    it('output contain pug template', function() {
      expect(result.out).match(/<div class="rule" id="rule_container">/)
      expect(result.out).match(/<p id="rule_content">Rule example<\/p>/)
    })
  })

  describe('can use Pug import feature with css file', function() {
    run('test/fixtures/include/main.css')
    success()
    it('output contain pug template', function() {
      expect(result.out).match(/<div class="rule" id="rule_container">/)
      expect(result.out).match(/<p id="rule_content">Rule example<\/p>/)
    })
  })
})
