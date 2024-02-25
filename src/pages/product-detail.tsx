import { ProductDetailList } from '@/features/product-detail/ui/product-detail-list'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { tg } = useTelegram()
  const {locale} = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    tg.BackButton.show()

    tg.BackButton.onClick(() => {
      navigate(`/${locale}`)
    })
  })

  return <ProductDetailList />
}

export default ProductDetail
