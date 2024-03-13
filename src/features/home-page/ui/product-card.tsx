import { Link } from 'react-router-dom'
import { Button } from '../../../shared/ui'
import { Product } from '../types/types'
import { useAddToCart } from '@/shared/hooks/useAddToCart'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface ProductCardProps {
  product: Product
  locale: string | undefined
  setBasketCount: Dispatch<SetStateAction<number>>
}

export const ProductCard = ({
  product,
  locale,
  setBasketCount,
}: ProductCardProps) => {
  const { t } = useTranslation()

  const { addToCArt, isLoading, error } = useAddToCart()

  return (
    <>
      {error && <div>{error}</div>}
      <div key={product.id} className="p-[15px] rounded-md shadow-lg gap-5">
        <Link to={`/${locale}/product/${product.id}`}>
          <img
            loading="lazy"
            src={product.image}
            alt="product-foto"
            className="w-full h-[200px] rounded-md mb-2"
          />

          <div className="text-lg font-bold">{product.title}</div>
          <div className="font-medium text-black/40 mb-2">
            {product.category}
          </div>
          <div className="font-medium flex-grow">
            {t('price')}: {product.price}
          </div>
        </Link>

        <div className="mt-[22px]">
          {product.basket_count && (
            <Button
              title={t('addedToCart')}
              loading={isLoading}
              onClick={() => {}}
              className="btn-disabled border-none"
            />
          )}

          {!product.basket_count && (
            <Button
              title={t('addToCart')}
              loading={isLoading}
              onClick={() => {
                addToCArt(product.id)
                setBasketCount((prev) => prev + 1)
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}
