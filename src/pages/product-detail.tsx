import { ProductDetailList } from '@/features/product-detail/ui/product-detail-list'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { useEffect } from 'react'

const ProductDetail = () => {
  const { tg } = useTelegram()


  useEffect(() => {
    tg.BackButton.show()

    tg.BackButton.onClick(() => {
      history.back()
    })
  })

  return <ProductDetailList />
}

export default ProductDetail
