#!/usr/bin/env node
const Styledown = require('../index')
const read = require('read-input')
const minimist = require('minimist')
const { basename } = require('path')
const { version } = require('../package.json')
const { writeFileSync } = require('fs')

const args = minimist(process.argv.slice(2), {
  boolean: ['inline', 'css', 'js', 'conf', 'quiet'],
  alias: { h: 'help', v: 'version', i: 'inline', o: 'output', q: 'quiet' }
})
if (args.version) {
  console.log(version)
  process.exit()
}

if (args.js) {
  print(Styledown.defaults.js())
  process.exit()
}

if (args.css) {
  print(Styledown.defaults.css())
  process.exit()
}

if (args.conf) {
  print(Styledown.defaults.conf())
  process.exit()
}

if (args.help || args._.length === 0) {
  let cmd = basename(process.argv[1])
  console.log([
      'Usage:',
      `    ${cmd} [options] FILE`,
      '',
      'Options:',
      '    -h, --help           print usage information',
      '    -v, --version        show version info and exit',
      '    -i, --inline         force extracts from inline CSS comments (for piping)',
      '    -o, --output FILE    write output a file',
      '',
      'Support files:',
      `    ${cmd} --conf > config.md`,
      `    ${cmd} --css > styledown.css`,
      `    ${cmd} --js > styledown.js`
  ].join('\n'))
  process.exit()
}

read(args._, function (err, res) {
  let errors = res.files.filter(function (f) { return !! f.error })

  if (errors.length) {
    errors.forEach(function (f) {
      console.error(`${f.name || 'stdin'  }:`, f.error.message)
    })
    process.exit(8)
  }

  let html

  let ms = measure(function () {
    html = `${Styledown.parse(res.files, {
      inline: args.inline
    })  }\n`
  })

  print(html, ms)
})

function print(html, ms) {
  if (args.output) {
    writeFileSync(args.output, html)

    if (!args.quiet) {
      let tip = `${  args.output}`
      if (ms) tip += ` [${  ms  }ms]`
      process.stderr.write(`${tip  }\n`)
    }
  } else {
    process.stdout.write(html)
  }
}

function measure(fn) {
  let d = new Date()
  fn()
  return new Date() - d
}
