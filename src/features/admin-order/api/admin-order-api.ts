import { http } from '@/shared/http/http'
import { AdminOrderType } from '../types/type'

export const AdminOrderApi = {
  getOrder: async (uuid: string | undefined) => {
    const { data } = await http<AdminOrderType>(`/order/${uuid}`)

    return data
  },
}
