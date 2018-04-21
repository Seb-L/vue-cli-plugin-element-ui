module.exports = (api, opts, files) => {
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
}
