import { http } from '@/shared/http/http'
import { ProductDetail } from '../types/product-detail'

export const ProductDetailApi = {
  getProductDetail: async (productId: string | undefined, user_id: number) => {
    const { data } = await http<ProductDetail>(`/product/${productId}`, {
      headers: { ['user-id']: user_id },
    })

    return data
  },
}
