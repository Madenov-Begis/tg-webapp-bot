import { http } from '@/shared/http/http'
import { ProductDetail } from '../types/product-detail'

export const ProductDetailApi = {
  getProductDetail: async (productId: string | undefined) => {
    const { data } = await http<ProductDetail>(`/product/${productId}`)

    return data
  },
}
