export interface Product {
  id: number
  title: string
  category: string
  price: number
  image: string
  basket_count: number | null
}

export interface Category {
  id: number
  name: string
}

export interface CreateBasketBody {
  customer_id: string
  product_id: number | undefined
  count: number
}
