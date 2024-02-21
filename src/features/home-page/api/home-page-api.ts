import { http } from '@/shared/http/http'
import { Category } from '../types/types'

export const HomePageApi = {
  getProducts: async (params: {
    page: number
    keyword: string
    category_id: number | null
  }) => {
    const { data } = await http('product', {
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
}
