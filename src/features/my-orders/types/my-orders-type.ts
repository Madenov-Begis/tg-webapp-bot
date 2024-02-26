import { OrderProduct } from '@/features/admin-order/types/type'

export interface MyOrdersType {
  status: string
  id: number
  full_name: string
  phone: string
  address: string
  created_at: string
  items: OrderProduct[]
}
