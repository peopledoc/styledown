let extend = require('util')._extend
let {
  parseCodeText,
  parseTags,
  htmlize,
} = require('./utils')
let Cheerio = require('cheerio')

/**
 * Adds classes
 */

exports.addClasses = function ($, pre) {
  $("*").addClass(pre())
}

/**
 * Break it apart into sections.
 *
 * Puts <h3> blocks into <section> blocks.
 */

exports.sectionize = function ($, tag, pre, options) {
  options = extend({
    'class': '',
    'until': 'h1, h2, h3, section',
  }, options)

  $(tag).each(function () {
    let $heading = $(this)
    let $extras = $heading.nextUntil(options.until)
    $heading.before(`<section class='${options.class}'>`)

    let $div = $(`section.${options.class}`).eq(-1)
    $div.addClass(pre(`section-${  $heading.attr('id')}`))
    $div.append($heading.remove())
    $div.append($extras.remove())
  })
}

/**
 * Unpacks `pre` blocks into examples.
 */

exports.unpackExample = function (parent, pre, highlight) {
  let code = parent.text()
  let block = parseCodeText(code)
  let tags = parseTags(block.tag)
  let klass
  if (tags.example) {
    let html = htmlize(block.code)
    let canvas = `<div class='${pre('canvas')}'>${html}</div>`
    let codeblock = `<pre class='${pre('code')}'>${highlight(html)}</pre>`
    let $block = Cheerio.load(`<div class='${pre('example')}'>${  canvas  }${codeblock  }</div>`)

    if (tags['class']) {
      klass = pre(tags['class'])
      $block(':root').addClass(klass)
    }

    parent.after($block.root())
    parent.remove()
  } else {
    klass = parent.find('code').attr('class')
    let m = klass.match(/lang-([a-z]+)/)

    if (m) {
      /* eslint-disable-next-line prefer-destructuring */
      let lang = m[1]
      let Hljs = require('highlight.js')
      parent.html(Hljs.highlight(lang, parent.text()).value)
      parent.addClass(pre(`lang-${lang}`))
      parent.addClass(pre('code'))
    }
  }
}

/**
 * Remove the configuration block.
 *
 * Removes the "Styleguide options" block from the DOM in `$`.
 */

exports.removeConfig = function ($) {
  let $h1 = $('h1#styleguide-options')
  $h1.nextUntil('h1').remove()
  $h1.remove()
}

/**
 * Process the configuration block
 */

exports.processConfig = function (src, options) {
  let Mdconf = require('./mdconf')
  try {
    let data = Mdconf(src, { normalizer: 'camelcase' })
    data = (data && data.styleguideOptions)

    if (data) extend(options, data)
  } catch (e) {
    // Don't bother if mdconf fails.
  }
}

/**
 * Isolates text blocks
 */

exports.isolateTextBlocks = function ($, pre) {
  let Cheerio = require('cheerio')

  $(`.${pre('block')}`).each(function() {
    let $this = $(this)
    // Check if there's an example block.
    // $('.sg-example', this).length doesn't work.
    let noExample = ($this.html().indexOf(pre('example')) === -1)
    let noCode    = ($this.html().indexOf(pre('code')) === -1)
    if (noExample && noCode) return

    let $first = $('h3', this)
    let $text = $first.nextUntil(`.${pre('example')}, .${pre('code')}`)

    var $block = Cheerio.load('<div>');
    var $textDiv = $block('div');
    $this.prepend($block.root());

    $textDiv.addClass(pre('text'));
    $textDiv.append($first);
    $textDiv.append($text);
  });
};
