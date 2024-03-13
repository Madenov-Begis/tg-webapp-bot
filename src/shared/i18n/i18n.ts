import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'ru',
  resources: {
    ru: {
      translation: {
        welcome: 'Добро пожаловать',
        search: 'Поиск',
        chooseCategory: 'Выберите категорию',
        all: 'Все',
        show10: 'Показать ещё 10',
        price: 'Цена',
        addedToCart: 'Добавлено в корзину',
        addToCart: 'Добавить в корзину',
        cart: 'Корзина',
        allPrice: 'Сумма товаров',
        deliver: 'Доставка',
        itogo: 'Итого',
        goToCart: 'Перейти в корзину',
        goToOrder: 'Перейти к оформлению',
        orderProduct: 'Оформление заказа',
        required: 'Обязательное поле',
        phone: 'Номер телефона',
        address: 'Адрес',
        order: 'Заказать',
        successOrder:
          'Буюртмангиз жойлаштирилди! Тасдиқлаш учун тез орада сиз билан боғланамиз.',
      },
    },
    uz: {
      translation: {
        welcome: 'Хуш келибсиз',
        search: 'Қидириш',
        chooseCategory: 'Категорияни танланг',
        all: 'Ҳаммаси',
        show10: 'Яна 10 тасини кўрсатиш',
        price: 'Нархи',
        addedToCart: 'Саватга қўшилди',
        addToCart: 'Саватга қўшиш',
        allPrice: 'Товарлар нархи',
        deliver: 'Йетказиб бериш',
        itogo: 'Жами',
        cart: 'Саватча',
        goToCart: 'Саватчага утиш',
        goToOrder: 'Тўловга ўтиш',
        orderProduct: 'Буюртма',
        required: 'Мажбурий майдон',
        phone: 'Телефон рақами',
        address: 'Манзил',
        order: 'Буюртма бериш',
        successOrder:
          'Буюртмангиз жойлаштирилди! Тасдиқлаш учун тез орада сиз билан боғланамиз.',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
