import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'ru',
  resources: {
    ru: {
      translation: {
        hello: 'Здравствуйте',
      },
    },
    kk: {
      translation: {
        hello: 'Ассалаума алейкум',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
