module.exports = api => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.3.6'
    }
  })

  api.postProcessFiles(files => {
    const file = files['src/main.ts']
      ? 'src/main.ts'
      : 'src/main.js'
    const main = files[file]
    if (main) {
      // inject import for registerServiceWorker script into main.js
      const lines = main.split(/\r?\n/g).reverse()
      const lastImportIndex = lines.findIndex(line => line.match(/^import/))

      lines[lastImportIndex] += `\nimport ElementUI from 'element-ui'`
      lines[lastImportIndex] += `\nimport locale from 'element-ui/lib/locale/lang/en'`
      lines[lastImportIndex] += `\nimport 'element-ui/lib/theme-chalk/index.css'`
      lines[lastImportIndex] += `\n`
      lines[lastImportIndex] += `\nVue.use(ElementUI, { locale })`

      files[file] = lines.reverse().join('\n')
    }
  })
}
