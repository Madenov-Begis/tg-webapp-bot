export interface Product {
  id: number
  title: string
  category: string
  price: number
  image: string
  basket_count: number | null
  status: number
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
