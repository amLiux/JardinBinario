module.exports = {
  locales: ['en', 'es'],
  defaultLocale: 'es',
  pages: {
    '*': ['index'],
    '/': ['index'],
    '/privacy': ['privacy'],
    '/about': ['about'],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
};