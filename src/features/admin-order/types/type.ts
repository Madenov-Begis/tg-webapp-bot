export interface AdminOrderType {
  id: number
  status: string
  full_name: string
  phone: string
  address: string
  items: OrderProduct[]
  order_id: number
}

export interface OrderProduct {
  id: number
  count: number
  price: number
  product: {
    id: number
    image: string
    price: number
    title: string
  }
}
