const i18n = require('i18n');

i18n.configure({
    locales:['en', 'hi'],
    defaultLocale: 'en',
    directory: `${__dirname}/locales`,
    objectNotation: true,
    queryParameter:'lang',
    register: global,
})

module.exports = i18n;