/**
 * Styledown is available as a Node.js package.
 *
 *     let Styledown = require('styledown');
 */

const Marked = require('marked')
const Cheerio = require('cheerio')
const extend = require('util')._extend
const mdextract = require('mdextract')
const hljs = require('highlight.js')
const { version } = require('./package.json')
const { readFileSync } = require('fs')
const default_conf = require('./lib/default_conf.js')
const { beautifyHTML } = require('./lib/utils')

const {
  addClasses,
  sectionize,
  unpackExample,
  processConfig,
  removeConfig,
  isolateTextBlocks
} = require('./lib/filters')
const { htmlize, prefixClass } = require('./lib/utils')


class Styledown {
  /***
   * Styledown() : new Styledown(source, [options])
   * Parses the source `source` into a Styledown document. `source` can be a
   * Markdown document.
   *
   *      doc = new Styledown(markdown);
   *      doc.toHTML();
   *
   * You may also use `Styledown.parse()` as a shorthand.
   */
  constructor(src, options) {
    this.options = extend(extend({}, Styledown.defaultOptions), options || {})
    let raws = this.extract(src)

    this.raws = this.process(raws, this.options)
  }

  /**
   * toHTML() : doc.toHTML()
   * Returns the full HTML source based on the Styledown document.
   *
   *     doc.toHTML()
   *     => "<!doctype html><html>..."
   */

  toHTML() {
    let html = this.raws.reduce((html, raw) => `${html}${raw.html}`, '')
    let config = this.raws.reduce((finalConfig, raw) => {
      return extend(finalConfig, raw.config)
    }, this.options)

    if (config.head !== false) {
      // Unpack template
      let $ = Cheerio.load(htmlize(config.template))
      $('body').append(htmlize(config.body))
      $('[sg-content]').append(html).removeAttr('sg-content')
      $('html, body').addClass(config.prefix)
      $('head').append(htmlize(config.head))

      html = $.html()
    }
    return this.prettyprint(html, { wrap_line_length: 0, ...config })
  }

  /**
   * toBareHTML() : doc.toBareHTML()
   * Returns the bare HTML without the head/body templates.
   *
   *     doc.toBareHTML()
   *     => "<div><h3>Your document</h3>..."
   */

  toBareHTML () {
    return this.raws.reduce((html, raw) => {
      return `${html}${raw.html}`
    }, '')
  }

  /**
   * @typedef ParsedFile
   * @property {string} filePath - Path to the file relative to process.cwd()
   * @property {string} html - file content converted to html using Marked
   * @property {string} raw - File content without the css/scss...
   */
  /**
   * Extract Markdown content from given `src` an generate html with it.
   *
   * @private
   * @argument {string|string[]} src
   * @returns {ParsedFile}
   */

  extract(src) {

    if (typeof src === 'string') {
      return [{
        filePath: '.',
        html: Marked(src),
        src
      }]
    }

    if (Array.isArray(src)) {
      return src.map((file) => {
        if (this.options.inline || file.name && file.name.match(/(sass|scss|styl|less|css)$/)) {
          let src = mdextract(file.data, { lang: 'css' }).toMarkdown()
          return {
            filePath: file.name,
            html: Marked(src),
            src
          }
        } else {
          return {
            filePath: file.name,
            src: file.data,
            html: Marked(file.data)
          }
        }
      })
    }
  }

  /**
   * Process ParsedFiles to generate documentation pages with HTML highlighting and Pug rendering
   *
   * @private
   * @argument {ParsedFile[]} raws
   * @argument {object} options
   */

  process(raws, options) {
    return raws.map((raw) => {
      let $ = Cheerio.load(raw.html)
      let highlightHTML = this.highlightHTML.bind(this)
      let p = this.prefix.bind(this)

      let config = processConfig(raw.src, options)
      removeConfig($)

      // let pre = this.options.prefix

      addClasses($, p)
      sectionize($, 'h3', p, { 'class': p('block') })
      sectionize($, 'h2', p, { 'class': p('section'), until: 'h1, h2' })

      $('pre').each(function () {
        unpackExample($(this), p, highlightHTML, raw.filePath)
      })

      isolateTextBlocks($, p)
      return {
        filePath: raw.filePath,
        src: raw.src,
        html: $.html(),
        config
      }
    })
  }

  /**
   * prettyprint() : doc.prettyprint(html)
   * (private) Reindents given `html` based on the indent size option.
   *
   *     doc.prettyprint('<div><a>hello</a></div>')
   *     => "<div>\n  <a>hello</a>\n</div>"
   */

  prettyprint(html, options) {

    let output = html.trim()

    output = beautifyHTML(html, options)

    // cheerio output tends to have a bunch of extra newlines. kill them.
    output = output.replace(/\n\n+/g, "\n\n")

    return output
  }

  /**
   * highlightHTML():
   * (private) Syntax highlighting helper
   */

  highlightHTML(html) {
    html = this.prettyprint(html)
    return hljs.highlight('html', html).value
  }

  /**
   * prefix():
   * (private) Prefix classnames. Takes `options.prefix` into account.
   *
   *     prefix('block')
   *     => 'sg-block'
   */

  prefix(klass) {
    return klass ?
      prefixClass(klass, this.options.prefix) :
      this.options.prefix
  }
}
/**
 * Styledown.parse() : Styledown.parse(source, [options])
 * Generates HTML from a given `source`.
 *
 *     Styledown.parse('### hello *world*');
 *     => "<!doctype html><html>..."
 *
 * `source` can be a String or an Array. as a string, it's assumed to be a
 * Markdown document. As an array, it's assumed to be a list of files.  It's
 * expected that it contains objects with `name` and `data` keys.
 *
 * In array mode, Styledown treats each file differently. Inline comments are
 * extracted from those with that end in CSS extensions (css, less, sass, etc),
 * while the rest are assumed to be Markdown documents.
 *
 *     let docs = [
 *       { name: 'css/style.css', data: '...' },
 *       { name: 'config.md', data: '...' }
 *     ];
 *
 *     Styledown.parse(docs);
 *     => "<!doctype html><html>..."
 *
 * You may pass `options` as the second parameter. Available options are:
 *
 * ~ prefix (String): prefix for classnames. Defaults to `sg`.
 * ~ template (String): HTML template. Defaults to a simple HTML template.
 * ~ head (String): HTML to put in the head. Default to `false`.
 * ~ body (String): HTML to put in the body. Defaults to `<div sg-content></div>`.
 * ~ indentSize (Number): Number of spaces to indent. Defaults to `2`.
 * ~ inline (Boolean): if `true`, then inline CSS mode is forced.
 *
 * This is shorthand for `new Styledown().toHTML()`. You can use `Styledown` as a class.
 */

Styledown.parse = function (source, options) {
  return new Styledown(source, options).toHTML()
}

/**
 * Styledown.version:
 * The version number in semver format.
 */

Styledown.version = version

/**
 * Styledown.defaults:
 * The returns the default configuration file, JS file and CSS files.
 *
 *     Styledown.defaults.conf()
 *     Styledown.defaults.js()
 *     Styledown.defaults.css()
 */

Styledown.defaults = {
  conf () {
    return default_conf
  },
  js () {
    return readFileSync(`${__dirname  }/assets/styledown.js`)
  },
  css () {
    return readFileSync(`${__dirname  }/assets/styledown.css`)
  }
}

Styledown.defaultOptions = {

  /* HTML template */
  template: [
    "<!doctype html>",
    "<html>",
    "<head>",
    "<meta charset='utf-8'>",
    "<title>Styledown</title>",
    "</head>",
    "<body>",
    "</body>",
    "</html>"
  ].join("\n"),

  /* Things to put into `head` */
  head: false,

  /* Force inline mode */
  inline: false,

  /* Things to put into `body` */
  body: "<div sg-content></div>",

  /* Prefix for classnames */
  prefix: 'sg',

  /* Indentation spaces */
  indentSize: 2
}

module.exports = Styledown
