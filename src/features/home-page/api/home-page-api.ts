import { http } from '@/shared/http/http'
import {
  Category,
  CreateBasketBody,
  Product,
  ProductParams,
} from '../types/types'
import { ResponseWithPagination } from '@/shared/types/Response'

export const HomePageApi = {
  getProducts: async ({ params }: { params: ProductParams }) => {
    const { data } = await http<ResponseWithPagination<Product[]>>('product', {
      params: {
        page: params.page,
        keyword: params.keyword,
        category_id: params.category_id,
        limit: 10,
        sort: 'ASC',
      },
    })

    return data
  },

  getCategories: async () => {
    const { data } = await http<Category[]>('/category')

    return data
  },

  addToBasket: async ({ body }: { body: CreateBasketBody }) => {
    const { data } = await http.post('/basket', body)

    return data
  },

  basketCount: async () => {
    const { data } = await http<{ count: number }>('/basket/count')

    return data
  },
}
