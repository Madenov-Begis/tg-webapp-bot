import { http } from '@/shared/http/http'
import { OrderFormBody, Orders } from '../types/order-types'

export const OrderApi = {
  orderCreate: async ({
    body,
    userId,
  }: {
    body: OrderFormBody
    userId: number
  }) => {
    const { data } = await http.post('/order', body, {
      headers: {
        ['user-id']: userId,
      },
    })

    return data
  },

  getAll: async (userId: number) => {
    const { data } = await http<Orders[]>('/order', {
      headers: {
        ['user-id']: userId,
      },
    })

    return data
  },
}
