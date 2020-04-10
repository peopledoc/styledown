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
      addCodeToggleButton(parent, code)
    }
  })

  function addCodeToggleButton (parent, code) {
    // hide the <pre>
    code.classList.add('sg-hidden')

    // create the <button>
    let button = document.createElement('button')
    // Need to link code section and button
    button.setAttribute('aria-label', 'Reveal code block')
    button.setAttribute('aria-live', 'polite')
    button.classList.add('sg-expando', 'sg-expando-reveal')
    parent.appendChild(button)

    button.addEventListener('click', function () {
      if (code.className.indexOf('sg-hidden') !== -1) {
        button.setAttribute('aria-label', 'Hide code block')
        code.className = code.className.replace('sg-hidden', 'sg-visible')
        button.className  = button.className.replace('sg-expando-reveal', 'sg-expando-contract')
      } else {
        button.setAttribute('aria-label', 'Reveal code block')
        code.className = code.className.replace('sg-visible', 'sg-hidden')
        button.className  = button.className.replace('sg-expando-contract', 'sg-expando-reveal')
      }
    })
  }

})()
