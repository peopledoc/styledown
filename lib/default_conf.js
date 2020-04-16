const fs = require('fs')
const path = require('path')

let basePath = path.resolve(__dirname, '../assets')
let styledownCSS = fs.readFileSync(`${basePath}/styledown.css`)
let styledownJS = fs.readFileSync(`${basePath}/styledown.js`)

// Should use local for js/css
module.exports = `
# Styleguide options

### Head

  <meta name='viewport' content='width=device-width, initial-scale=1' />",
  <script data-styledownjs>
    ${styledownJS}
  </script>
  <style data-styledowncss>
    ${styledownCSS}
  </style>
  <link rel='stylesheet' href='your-stylesheet-here.css' />

### Body

<div class='sg-container' sg-content></div>
`
