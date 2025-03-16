import { http } from '@/shared/http/http'
import { AdminOrderType } from '../types/type'
import { ResponseWithData } from '@/shared/types/Response'

export const AdminOrderApi = {
  getOrder: async (uuid: string | undefined) => {
    const { data } = await http<ResponseWithData<AdminOrderType>>(
      `/order/${uuid}`
    )

    return data
  },
}
