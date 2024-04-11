import { http } from '@/shared/http/http'
import { OrderFormBody, Orders } from '../types/order-types'

export const OrderApi = {
  orderCreate: async ({
    body,
    locale,
  }: {
    body: OrderFormBody
    locale: string | undefined
  }) => {
    const { data } = await http.post('/order', body, {
      headers: {
        ['Accept-Language']: locale,
      },
    })

    return data
  },

  getAll: async (locale: string | undefined) => {
    const { data } = await http<Orders[]>('/order', {
      headers: {
        ['Accept-Language']: locale,
      },
    })

    return data
  },
}
