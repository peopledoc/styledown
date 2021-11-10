# Styledown

Write maintainable CSS styleguides efficiently using a Markdown.

![Example](https://raw.githubusercontent.com/peopledoc/styledown/master/examples/screenshot.png)

ℹ️ This package is forked from [Styledown](https://github.com/styledown/styledown).

## Installation

Add the github registry in your `.npmrc` for @peopledoc scoped package:

```
# Points to Github NPM registry
@peopledoc:registry=https://npm.pkg.github.com
````

Then you can install it:

``` bash
npm install -g @peopledoc/styledown
styledown --help
```

## How it works

Styledown is made to work in most web development setups. It doesn't favor any framework or language or any preprocessor.

* [Document][doc] your CSS files with inline comments, or as a separate `.md` file.
* Create a file with styleguide [configuration][conf].
* Invoke `styledown *.css > styleguide.html`.
* Enjoy your styleguide! Read more about the [format][fmt].

[doc]: docs/Documenting.md
[conf]: docs/Configuration.md
[fmt]: docs/Format.md

## Quickstart guide

Here's a generic guide on getting started with Styledown on any project. We're
gonna assume that you're using Sass and that your project bundles all CSS files
into one file.

Let's assume that your files are in `css/`, and that your final styleguide will
be in `public/styleguide.html`.

```text
                    Example setup

.----------------------.     .---------------------.
| css/                 |     |                     |
|     config.md        |     |  public/            |
|     button.scss      | ==> |    styleguide.html  |
|     forms.scss       |     |                     |
|     whatever.scss    |     |                     |
'----------------------'     '---------------------'
```

### Step 1: Document

Document your project's stylesheets with inline comments, or as separate `.md`
files.

```css
/**
 * Component name:
 * `.your-component-here` - documentation on what your
 * component is goes here. Markdown is encouraged.
 *
 *     @example
 *     div.your-component-here
 *       h3 Sample code
 *       p goes here
 */

.your-component-here {
  display: block;
  /*...*/
}
```

Read more: **[Documenting ▸](docs/Documenting.md)**

### Step 2: Configure

Make a file, let's call it `config.md`. (`styledown --conf > config.md`) This
lets you define what will be in the output head/body.

```markdown
# Styleguide options

### Head

    link(rel="stylesheet" href="/assets/application.css")
    <style>
      /* styledown css */
    </style>
    <script>
      /* styledown js */
    </script>

### Body

    h1 My Awesome Styleguides
    div#styleguides(sg-content)
```

The first one (`application.css`) should point to your project's concatenated
stylesheets. The second and third one (`styledown.css` and `styledown.js`)
point to the default Styledown CSS/JS files.

Read more: **[Configuration ▸](docs/Configuration.md)**

### Step 3: Build

Invoke `styledown` to generate an HTML file. (Make sure that the extras.css is
passed on the end, since anything after the "Styleguide options" heading is ignored.)

```bash
 styledown css/*.css css/config.md > public/styleguides.html
```

### Enjoy!

Now open `public/styleguides.html` in your browser.

## Usage

Styledown generates `.html` styleguides. It can take CSS files or Markdown 
files, or a combination of the two.

__Inline CSS mode:__ Parses comments from CSS files. This is what happens when 
you pass .css, .sass, .scss, .less and .styl files.

```bash
 styledown *.css > styleguide.html
```

__Markdown mode:__ Takes Markdown files.

```bash
 styledown *.md > styleguide.html
```

## Markup format

Read more: **[Markup format ▸](docs/Format.md)**

## Contributors

<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/rstacruz">
            <img src="https://avatars.githubusercontent.com/u/74385?v=4" width="100;" alt="rstacruz"/>
            <br />
            <sub><b>rstacruz</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/KamiKillertO">
            <img src="https://avatars.githubusercontent.com/u/9579729?v=4" width="100;" alt="KamiKillertO"/>
            <br />
            <sub><b>KamiKillertO</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ryuran">
            <img src="https://avatars.githubusercontent.com/u/1309340?v=4" width="100;" alt="ryuran"/>
            <br />
            <sub><b>ryuran</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/MrChocolatine">
            <img src="https://avatars.githubusercontent.com/u/47531779?v=4" width="100;" alt="MrChocolatine"/>
            <br />
            <sub><b>MrChocolatine</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Erol">
            <img src="https://avatars.githubusercontent.com/u/20772?v=4" width="100;" alt="Erol"/>
            <br />
            <sub><b>Erol</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->
