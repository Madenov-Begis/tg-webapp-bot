import { http } from '@/shared/http/http'
import {
  Category,
  CreateBasketBody,
  Product,
  ProductParams,
} from '../types/types'
import {
  ResponseWithData,
  ResponseWithPagination,
} from '@/shared/types/Response'

export const HomePageApi = {
  getProducts: async ({
    params,
    locale,
  }: {
    params: ProductParams
    locale: string | undefined
  }) => {
    const { data } = await http<ResponseWithPagination<Product[]>>('product', {
      params: {
        page: params.page,
        keyword: params.keyword,
        category_id: params.category_id,
        limit: 10,
        sort: 'ASC',
      },
      headers: {
        ['Accept-Language']: locale,
      },
    })

    return data
  },

  getCategories: async (locale: string | undefined) => {
    const { data } = await http<ResponseWithData<Category[]>>('/category', {
      headers: {
        ['Accept-Language']: locale,
      },
    })

    return data
  },

  addToBasket: async ({ body }: { body: CreateBasketBody }) => {
    const { data } = await http.post('/basket', body)

    return data
  },

  basketCount: async () => {
    const { data } = await http<{ data: {count: number} }>('/basket/count')

    return data
  },
}
