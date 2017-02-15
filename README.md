# whittle-cli
A simple CLI for scaffolding modular HTML/CSS projects based on Stylus and Pug(Jade) .

### Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=4.x, 6.x preferred), npm version 3+ and [Git](https://git-scm.com/).

``` bash
$ npm install -g whittle-cli
```

### Usage

``` bash
$ whittle init <project-name>
```

Example:

``` bash
$ whittle init example-project
$ cd example-project
$ npm install
$ gulp
```

Use Option mode:

``` bash
$ whittle init
```
#### Option list:
* Support mobile
* Support IE8+
* Export PHP Template
* Import font-awesome
* Import bootstrap

### Build HTML/CSS

``` bash
$ gulp build
```

### Build PHP Native template
``` bash
$ gulp php
```

### Build Other Language Template

Implementations in other languages:

  - [Larpug - Pug for Laravel](https://github.com/acidjazz/larpug)
  - [php](https://github.com/pug-php/pug)
  - [scala](https://scalate.github.io/scalate/documentation/scaml-reference.html)
  - [ruby](https://github.com/slim-template/slim)
  - [python](https://github.com/SyrusAkbary/pyjade)
  - [java](https://github.com/neuland/jade4j)

Other:

  - [Emacs Mode](https://github.com/brianc/jade-mode)
  - [Vim Syntax](https://github.com/digitaltoad/vim-pug)
  - [TextMate Bundle](http://github.com/miksago/jade-tmbundle)
  - [Coda/SubEtha syntax Mode](https://github.com/aaronmccall/jade.mode)
  - [html2pug](https://github.com/donpark/html2jade) converter
  - [pug2php](https://github.com/SE7ENSKY/jade2php) converter
  - [Pug Server](https://github.com/ded/jade-server)  Ideal for building local prototypes apart from any application
  - [pug-ruby](https://github.com/yivo/pug-ruby) gem: Allows to invoke Pug and Jade from Ruby
  - [pug-rails](https://github.com/yivo/pug-rails) gem: Integrates Pug and Jade into your Rails application


### License

[MIT](http://opensource.org/licenses/MIT)