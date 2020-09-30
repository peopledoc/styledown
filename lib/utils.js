const Pug = require('pug')
const prettier = require('prettier')

/**
 * Get the tags and code out of the code text.
 *
 *     parseCodeText('@example\nhello')
 *     => { tag: 'example', code: 'hello' }
 *
 *     parseCodeText('hello')
 *     => { tag: null, code: 'hello' }
 */

function parseCodeText(code) {
  let matches = code.trim().match(/^@([^\n]+)/)

  if (matches) {
    return {
      tag: matches[1],
      code: code.substr(matches[1].length+2)
    }
  }
  return {
    tag: null,
    code
  }
}

/**
 * Parse tags
 */

function parseTags(str) {
  if (typeof str !== 'string') return {}

  let matches
  let obj = {}
  str = str.trim()

  /* eslint-disable */
  while (true) {
    if (matches = str.match(/^\.([a-z\-]+)\s*/)) {
      if (!obj['class']) obj['class'] = []
      obj['class'].push(matches[1])
    } else if (matches = str.match(/^([a-z\-]+)="([^"]+)"\s*/)) {
      obj[matches[1]] = matches[2]
    } else if (matches = str.match(/^([a-z\-]+)='([^']+)'\s*/)) {
      obj[matches[1]] = matches[2]
    } else if (matches = str.match(/^([a-z\-]+)=([^\s]+)\s*/)) {
      obj[matches[1]] = matches[2]
    } else if (matches = str.match(/^([a-z\-]+)\s*/)) {
      obj[matches[1]] = true
    } else {
      if (obj['class']) obj['class'] = obj['class'].join(' ')
      return obj
    }
    /* eslint-enable */

    // Trim
    str = str.substr(matches[0].length)
  }
}

/**
 * Prefixes classnames.
 *
 *     prefixClass('white', 'sg')     => 'sg-white'
 *     prefixClass('pad dark', 'sg')  => 'sg-pad sg-dark'
 */

function prefixClass(klass, prefix) {
  return klass.split(' ').map(function (n) {
    return n.length > 0 ? (`${prefix  }-${  n}`) : n
  }).join(' ')
}

/**
 * Processes a block of text as either HTML or Pug.
 */
function htmlize(src, filePath = '.') {
  // Mdconf processes them as arrays
  if (src.constructor === Array) {
    /* eslint-disable-next-line prefer-destructuring */
    src = src[0]
  }

  if (src.substr(0, 1) === '<') {
    return src
  } else {
    let html = Pug.render(src, {
      filename: filePath,
      doctype: 'html'
    })
    return beautifyHTML(html)
  }
}

/**
 * Beautify HTML text with prettier
 *
 * @param {string} html
 */
function beautifyHTML(html, options) {
  let output = prettier.format(html, {
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore',
    insertPragma: false,
    printWidth: 120,
    proseWrap: 'preserve',
    requirePragma: false,
    singleQuote: false,
    tabWidth: 2,
    useTabs: false,
    vueIndentScriptAndStyle: false,
    ...options
  })

  return removeTrailingSlash(output)
}

/**
 * Remove trailing slash on self closing elements but ignore SVG elements
 * "<input .../>" becomes "<input ...>"
 * But "<use .../>" is not modified
 *
 * @param {string} html
 */

function removeTrailingSlash(html) {

  const removeSlash = (t) => t.replace(/\/>/g, '>')

  let parts = html
    .split(/<svg/)

  if (parts.length === 1) {
    return removeSlash(parts[0])
  }

  return parts.map((t, i) => {
    if (i === 0) {
      return removeSlash(parts[0])
    }
    return t.split(/<\/svg>/)
      .map((t, index) => index % 2 === 1 ? removeSlash(t): t)
      .join('</svg>')
    }).join('<svg')
}

module.exports = {
  parseCodeText,
  parseTags,
  prefixClass,
  htmlize,
  beautifyHTML
}
