
/**
 * Module dependencies.
 */

let md = require('marked')

/**
 * Parse the given `str` of markdown.
 *
 * @param {String} str
 * @param {Object} options
 * @return {Object}
 * @api public
 */

module.exports = function(str, options){
  options = options || {}

  options = {
    normalizer: options.normalizer || 'spaced'
  }

  let normalize = normalizers[options.normalizer]
  let toks = md.lexer(str)
  let conf = {}
  let keys = []
  let depth = 0

  toks.forEach(function(tok){
    switch (tok.type) {
      case 'heading':
        while (depth-- >= tok.depth) keys.pop()
        keys.push(normalize(tok.text))
        /* eslint-disable-next-line prefer-destructuring */
        depth = tok.depth
        break
      case 'list_item_start':
      case 'list_item_end':
        break
      case 'text':
        put(conf, keys, tok.text, normalize)
        break
      case 'code':
        put(conf, keys, tok.text, normalize, true)
        break
    }
  })

  return conf
}

/**
 * Add `str` to `obj` with the given `keys`
 * which represents the traversal path.
 *
 * @param {Object} obj
 * @param {Array} keys
 * @param {String} str
 * @param {Function} normalize
 * @api private
 */

function put(obj, keys, str, normalize, code) {
  let target = obj
  let last
  let key
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    last = target
    target[key] = target[key] || {}
    target = target[key]
  }

  // code
  if (code) {
    if (!Array.isArray(last[key])) {
      last[key] = []
    }
    last[key].push(str)
    return
  }

  let index = str.indexOf(':')

  // list
  if (-1 == index) {
    if (!Array.isArray(last[key])) {
      last[key] = []
    }
    last[key].push(str.trim())
    return
  }

  // map
  key = normalize(str.slice(0, index))
  let val = str.slice(index + 1).trim()
  target[key] = val
}

/**
 * Normalize `str`.
 */

let normalizers = {
  spaced(str) {
    return str.replace(/\s+/g, ' ').toLowerCase().trim()
  },
  camelcase(str) {
    return str.toLowerCase().replace(/\s+([^\s])/g, function(_, char) { return char.toUpperCase() }).trim()
  }
}
