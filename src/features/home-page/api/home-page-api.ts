import { http } from '@/shared/http/http'
import {
  Category,
  CreateBasketBody,
  Product,
  ProductParams,
} from '../types/types'
import { ResponseWithPagination } from '@/shared/types/Response'

export const HomePageApi = {
  getProducts: async ({
    params,
    // user_id,
  }: {
    params: ProductParams
    user_id: number
  }) => {
    const { data } = await http<ResponseWithPagination<Product[]>>('product', {
      params: {
        page: params.page,
        keyword: params.keyword,
        category_id: params.category_id,
        limit: 10,
        sort: 'ASC',
      },
      // headers: {
      //   ['user-id']: user_id,
      // },
    })

    return data
  },

  getCategories: async (user_id: number) => {
    const { data } = await http<Category[]>('/category', {
      headers: {
        ['user-id']: user_id,
      },
    })

    return data
  },

  addToBasket: async ({
    body,
    user_id,
  }: {
    body: CreateBasketBody
    user_id: number
  }) => {
    const { data } = await http.post('/basket', body, {
      headers: {
        ['user-id']: user_id,
      },
    })

    return data
  },

  basketCount: async (user_id: number) => {
    const { data } = await http<{ count: number }>('/basket/count', {
      headers: {
        ['user-id']: user_id,
      },
    })

    return data
  },
}
