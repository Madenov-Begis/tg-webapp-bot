import { http } from '@/shared/http/http'
import { ResponseWithPagination } from '@/shared/types/Response'
import { MyOrdersType } from '../types/my-orders-type'

export const MyOrdersApi = {
  getAll: async (user_id: number) => {
    const { data } = await http<ResponseWithPagination<MyOrdersType[]>>(
      '/order',

      {
        headers: {
          ['user-id']: user_id,
        },
        params: {
          limit: 10,
        },
      }
    )

    return data
  },
}
