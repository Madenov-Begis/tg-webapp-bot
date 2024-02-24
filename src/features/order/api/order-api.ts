import { http } from '@/shared/http/http'
import { OrderFormBody, Orders } from '../types/order-types'

export const OrderApi = {
  orderCreate: async (body: OrderFormBody) => {
    const { data } = await http.post('/order', body)

    return data
  },

  getAll: async () => {
    const { data } = await http<Orders[]>('/order')

    return data
  },
}
