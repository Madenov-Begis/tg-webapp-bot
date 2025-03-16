export interface ProductDetail {
  id: number | undefined
  image: string | undefined
  title: string | undefined
  description: string | undefined
  category: {
    id: number
    name: string
    is_main: boolean
    created_at: string
    updated_at: string
  }
  price: number | undefined
  basket_count: number | null
  is_active: number | undefined
}
