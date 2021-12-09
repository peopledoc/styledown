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

  function addCodeToggleButton(parent, code) {
    // hide the <pre>
    code.classList.add('sg-hidden')

    // create the <button>
    let buttonTop = document.createElement('button')
    // Need to link code section and button
    buttonTop.setAttribute('aria-label', 'Reveal code block')
    buttonTop.setAttribute('aria-live', 'polite')
    buttonTop.classList.add('sg-expando', 'sg-expando-reveal')

    // create a second <button> that will appear AFTER the code block
    let buttonBottom = buttonTop.cloneNode(true)

    // bind event listeners
    buttonTop.addEventListener('click', toggleCodeBlock)
    buttonBottom.addEventListener('click', toggleCodeBlock)

    // insert elements
    parent.insertBefore(buttonTop, code)
    parent.appendChild(buttonBottom)
  }

  function toggleCodeBlock(event) {
    let { parentNode } = event.currentTarget
    let buttons = parentNode.querySelectorAll('.sg-expando')
    let codeBlock = parentNode.querySelector('.sg-code')

    if (codeBlock.classList.contains('sg-hidden')) {

      codeBlock.classList.replace('sg-hidden', 'sg-visible')
      buttonsShouldNowReveal(buttons, false)

    } else {

      codeBlock.classList.replace('sg-visible', 'sg-hidden')
      buttonsShouldNowReveal(buttons)

    }
  }

  function buttonsShouldNowReveal(elems = [], shouldReveal = true) {
    [].forEach.call(elems, function (elem) {
      let ariaLabel = 'Hide code block'
      let classes   = ['sg-expando-reveal', 'sg-expando-contract']

      if (shouldReveal) {
        ariaLabel = 'Reveal code block'
        classes.reverse()
      }

      elem.setAttribute('aria-label', ariaLabel)
      elem.classList.replace(...classes)
    })
  }

})()
