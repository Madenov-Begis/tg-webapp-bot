import { http } from '@/shared/http/http'
import { Category, CreateBasketBody, Product } from '../types/types'
import { ResponseWithPagination } from '@/shared/types/Response'

export const HomePageApi = {
  getProducts: async (params: {
    page: number
    keyword: string
    category_id: number | null
  }) => {
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

  addToBasket: async (body: CreateBasketBody) => {
    const { data } = await http.post('/basket', body)

    return data
  },
}
