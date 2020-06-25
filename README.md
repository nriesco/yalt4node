# Yalt4node

yalt4node - yet another library template for nodejs

## Install

`npm i -g yalt4node`

## Usage

`yalt4node generate lib`

```bash
? Lib name (use camelCase or kebab-case => will be transformed to kebab-case) my super lib
? Enter your github username nriesco
⠼ 2/3 Installing...

Done!
Happy coding!
```

This will result in a directory (`my-super-lib`) with this structure:

```txt
├── COVERAGE
|  └── index.html
|  └── ...
├── dist
|  └── .create
|  └── COVERAGE.md
|  └── COVERAGE_RAW.md
|  └── DOCS.md
├── node_modules
|  └── ...
├── src
|  └── index.js
├── test
|  └── index.js
├── .eslintrc.json
├── .mocharc.js
├── CHANGELOG.md
├── nyc.config.js
├── package-lock.json
├── package.json
├── README.md
└── webpack.config.js
```

Try `open coverage/index.html` and navigate that local site.

Also `dist/COVERAGE.md` and `dist/DOCS.md` are generated, they are (so far) fully compatible with vuepress and vuepress flowchart plugin.


DOCS.md will look like this:

![Sample DOCS]("./sampleDOCS.png")

And COVERAGE.md will look like this:

![Sample COVERAGE]("./sampleCOVERAGE.png")


## Important references

- JSDocs: https://jsdoc.app
- Vuepress: https://vuepress.vuejs.org
- Vuepress flowchart plugin: https://github.com/ulivz/vuepress-plugin-flowchart
- jsdoc2vuepress: https://github.com/nriesco/jsdoc2vuepress