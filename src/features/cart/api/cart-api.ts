import { http } from '@/shared/http/http'
import { Cart } from '../types/cart-types'

export const CartApi = {
  getAll: async (user_id: number) => {
    const { data } = await http<Cart>('/basket', {
      headers: {
        ['user-id']: user_id,
      },
    })

    return data
  },

  delete: async ({ id, user_id }: { id: number; user_id: number }) => {
    const { data } = await http.delete(`/basket/${id}`, {
      headers: {
        ['user-id']: user_id,
      },
    })

    return data
  },

  changeCount: async ({
    id,
    body,
    user_id,
  }: {
    id: number
    body: { count: number }
    user_id: number
  }) => {
    const { data } = await http.patch(`/basket/${id}`, body, {
      headers: {
        ['user-id']: user_id,
      },
    })

    return data
  },
}
