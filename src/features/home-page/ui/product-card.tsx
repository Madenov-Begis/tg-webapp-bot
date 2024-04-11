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
      <div key={product.id} className="p-[15px] rounded-md shadow-lg gap-5 flex flex-col">
        <Link to={`/${locale}/product/${product.id}`} className='flex-grow'>
          <img
            loading="lazy"
            src={product.image}
            alt="product-foto"
            className="w-full h-[300px] rounded-md mb-2"
          />

          <div className="text-lg font-bold">{product.title}</div>
          <div className="font-medium text-black/40 mb-2">
            {product.category}
          </div>

          {product.status ? (
            <span className="font-semibold text-[#1EA1F1] mb-2">Есть в наличии</span>
          ) : (
            <span className="font-semibold text-red-500 mb-2">Нет в наличии</span>
          )}

          <div className="font-medium flex-shrink-0">
            {t('price')}: {product.price.toLocaleString()}
          </div>
        </Link>

        <div className="mt-[22px] flex-grow-0">
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
