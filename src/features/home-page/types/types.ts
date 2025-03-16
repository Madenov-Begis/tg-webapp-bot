export interface Product {
  id: number
  name: string
  description: string
  image: string
  price: string
  basket_count: number | null
  is_active: boolean
  category: Category
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
}

export interface CreateBasketBody {
  product_id: number | undefined
  count: number
}

export interface ProductParams {
  page: number
  keyword: string
  category_id: number | null
}
