module.exports = (api, opts, files) => {
  const file = files['src/i18n.ts']
    ? 'src/i18n.ts'
    : 'src/i18n.js'
  const i18n = files[file]
  if (i18n) {
    // inject import for registerServiceWorker script into main.js
    const lines = i18n.split(/\r?\n/g).reverse()
    const lastImportIndex = lines.findIndex(line => line.match(/^import/))

    opts.vuei18nLocales.forEach(locale => {
      lines[lastImportIndex] += `\nimport ${locale.replace('-', '_')} from 'element-ui/lib/locale/lang/${locale}'`
    })

    // message obj init
    const msgObjIndex = lines.findIndex(line => line.match(/^\s\sconst messages = {}/))
    const langKeys = opts.vuei18nLocales.join(', ').replace(/-/gm, '_')
    lines[msgObjIndex] = `  const messages = { ${langKeys} }`

    // message concat
    const msgConcatIndex = lines.findIndex(line => line.match(/^\s\s\s\smessages\[locale\] = locales\(key\)/))
    lines[msgConcatIndex] = `    messages[locale] = Object.assign(messages, locales(key))`

    files[file] = lines.reverse().join('\n')
  }
}
