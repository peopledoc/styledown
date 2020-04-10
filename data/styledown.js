(function () {
  function ready(callback) {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback)
    }
  }

  // create expando buttons
  ready(function () {
    let codes = document.querySelectorAll('.sg-example .sg-code')

    for (let i = codes.length-1; i >= 0; i--) {
      let code = codes[i]
      let parent = code.parentNode
      addButton(parent, code)
    }
  })

  function addButton (parent, code) {
    // hide the <pre>
    code.classList.add('sg-hidden')

    // create the <button>
    let btn = document.createElement('button')
    btn.classList.add('sg-expando', 'sg-expando-reveal')
    parent.appendChild(btn)

    btn.addEventListener('click', function () {
      if (code.className.indexOf('sg-hidden') !== -1) {
        code.className = code.className.replace('sg-hidden', 'sg-visible')
        btn.className  = btn.className.replace('sg-expando-reveal', 'sg-expando-contract')
      } else {
        code.className = code.className.replace('sg-visible', 'sg-hidden')
        btn.className  = btn.className.replace('sg-expando-contract', 'sg-expando-reveal')
      }
    })
  }

})()
