import { http } from '@/shared/http/http'
import { Cart } from '../types/cart-types'

export const CartApi = {
  getAll: async (locale: string | undefined) => {
    const { data } = await http<Cart>('/basket', {
      headers: {
        ['Accept-Language']: locale,
      },
    })

    return data
  },

  delete: async ({
    id,
    locale,
  }: {
    id: number
    locale: string | undefined
  }) => {
    const { data } = await http.delete(`/basket/${id}`, {
      headers: {
        ['Accept-Language']: locale,
      },
    })

    return data
  },

  changeCount: async ({
    id,
    body,
    locale,
  }: {
    id: number
    body: { count: number }
    locale: string | undefined
  }) => {
    const { data } = await http.patch(`/basket/${id}`, body, {
      headers: {
        ['Accept-Language']: locale,
      },
    })

    return data
  },
}
