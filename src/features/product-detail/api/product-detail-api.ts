import { http } from '@/shared/http/http'
import { ProductDetail } from '../types/product-detail'

export const ProductDetailApi = {
  getProductDetail: async ({
    productId,
    locale,
  }: {
    productId: string | undefined
    locale: string | undefined
  }) => {
    const { data } = await http<ProductDetail>(`/product/${productId}`, {
      headers: {
        ['Accept-Language']: locale,
      },
    })

    return data
  },
}
