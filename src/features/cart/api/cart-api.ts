import { http } from '@/shared/http/http'
import { Cart } from '../types/cart-types'

export const CartApi = {
  getAll: async () => {
    const { data } = await http<Cart>('/basket')

    return data
  },

  delete: async ({ id }: { id: number }) => {
    const { data } = await http.delete(`/basket/${id}`)

    return data
  },

  changeCount: async ({
    id,
    body,
  }: {
    id: number
    body: { count: number }
  }) => {
    const { data } = await http.patch(`/basket/${id}`, body)

    return data
  },
}
