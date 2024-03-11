import { http } from '@/shared/http/http'
import { ResponseWithPagination } from '@/shared/types/Response'
import { MyOrdersType } from '../types/my-orders-type'

export const MyOrdersApi = {
  getAll: async () => {
    const { data } = await http<ResponseWithPagination<MyOrdersType[]>>(
      '/order',

      {
        params: {
          limit: 10,
        },
      }
    )

    return data
  },
}
