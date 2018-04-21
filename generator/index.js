const updateMain = require('./main')
const updateI18n = require('./i18n')

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.3.6'
    }
  })

  if (opts.scssTheme) {
    api.render('./templates/scss')
  }

  api.postProcessFiles(files => {
    // update main.js
    updateMain(api, opts, files)

    // update i18n.js
    if (opts.vuei18nLocales) {
      updateI18n(api, opts, files)
    }
  })
}
