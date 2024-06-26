const i18n = require('../i18n/config');

function localizationMiddleware(req,res, next){
    const supportedLocales = ['en', 'hi'];
  const acceptLanguage = req.headers['accept-language'];
  const detectedLocale = i18n.getLocale(req) || i18n.defaultLocale;

  if (supportedLocales.includes(detectedLocale)) {
    i18n.setLocale(req, detectedLocale);
  } else {
    const preferredLocale = i18n.preferredLocale(acceptLanguage, supportedLocales);
    i18n.setLocale(req, preferredLocale);
  }

  next();
}

module.exports = localizationMiddleware;