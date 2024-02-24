import { Product } from '@/features/home-page/types/types'

export interface Cart {
  baskets: CartItem[]
  total_price: number
  deleviry_price: number
}

export interface CartItem {
  id: number
  count: number
  product: Product
}
