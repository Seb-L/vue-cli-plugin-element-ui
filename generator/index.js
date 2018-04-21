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
    const file = files['src/main.ts']
      ? 'src/main.ts'
      : 'src/main.js'
    const main = files[file]
    if (main) {
      // inject import for registerServiceWorker script into main.js
      const lines = main.split(/\r?\n/g).reverse()
      const lastImportIndex = lines.findIndex(line => line.match(/^import/))

      lines[lastImportIndex] += `\nimport ElementUI from 'element-ui'`

      // locale
      if (opts.standardLocale) {
        lines[lastImportIndex] += `\nimport locale from 'element-ui/lib/locale/lang/${opts.standardLocale}'`
      }

      // theme
      if (opts.scssTheme) {
        lines[lastImportIndex] += `\nimport './styles.scss'`
      } else {
        lines[lastImportIndex] += `\nimport 'element-ui/lib/theme-chalk/index.css'`
      }

      lines[lastImportIndex] += `\n`

      // locale
      if (opts.standardLocale) {
        lines[lastImportIndex] += `\nVue.use(ElementUI, { locale })`
      } else {
        lines[lastImportIndex] += `\nVue.use(ElementUI)`
      }

      files[file] = lines.reverse().join('\n')
    }

    // update i18n.js
    if (opts.vuei18nLocales) {
      const i18nFile = files['src/i18n.ts']
        ? 'src/i18n.ts'
        : 'src/i18n.js'
      const i18n = files[i18nFile]
      if (i18n) {
        // inject import for registerServiceWorker script into main.js
        const i18nLines = i18n.split(/\r?\n/g).reverse()
        const i18nLastImportIndex = i18nLines.findIndex(line => line.match(/^import/))

        opts.vuei18nLocales.forEach(locale => {
          i18nLines[i18nLastImportIndex] += `\nimport ${locale.replace('-', '_')} from 'element-ui/lib/locale/lang/${locale}'`
        })

        // message obj init
        const msgObjIndex = i18nLines.findIndex(line => line.match(/^\s\sconst messages = {}/))
        const langKeys = opts.vuei18nLocales.join(', ').replace(/-/gm, '_')
        i18nLines[msgObjIndex] = `  const messages = { ${langKeys} }`

        // message concat
        const msgConcatIndex = i18nLines.findIndex(line => line.match(/^\s\s\s\smessages\[locale\] = locales\(key\)/))
        i18nLines[msgConcatIndex] = `    messages[locale] = Object.assign(messages, locales(key))`

        files[i18nFile] = i18nLines.reverse().join('\n')
      }
    }
  })
}
