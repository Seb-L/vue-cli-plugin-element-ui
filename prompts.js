const localeList = ['af-ZA', 'ar', 'bg', 'ca', 'cs-CZ', 'da', 'de', 'ee', 'el', 'en', 'es', 'fa', 'fi', 'fr', 'he', 'hu', 'id', 'it', 'ja', 'ko', 'ku', 'kz', 'lt', 'lv', 'mn', 'nb-NO', 'nl', 'pl', 'pt-br', 'pt', 'ro', 'ru-RU', 'sk', 'sl', 'sv-SE', 'ta', 'th', 'tk', 'tr-TR', 'ua', 'ug-CN', 'vi', 'zh-CN', 'zh-TW']

module.exports = [
  {
    type: 'confirm',
    name: 'scssTheme',
    message: 'Use scss theme?'
  },
  {
    type: 'list',
    name: 'i18n',
    message: 'ElementUi i18n options',
    choices: [
      { name: 'None', value: 'none' },
      { name: 'Standard', value: 'standard' },
      { name: 'VueI18n (with i18n cli plugin)', value: 'vuei18n' }
    ],
    default: 'None',
  },
  {
    when: answers => answers.i18n === 'standard',
    type: 'list',
    name: 'standardLocale',
    message: 'Select the locale you want to load',
    choices: localeList,
    default: 'en',
  },
  {
    when: answers => answers.i18n === 'vuei18n',
    type: 'checkbox',
    name: 'vuei18nLocales',
    message: 'Select the locales you want to load',
    choices: localeList
  }
]
