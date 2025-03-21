import { Link } from 'react-router-dom'
import { Button } from '../../../shared/ui'
import { Product } from '../types/types'
import { useAddToCart } from '@/shared/hooks/useAddToCart'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'

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
      <div
        key={product.id}
        className="p-3 border border-[#71717133] rounded-md shadow-sm shadow-base-300 gap-5 flex flex-col"
      >
        <Link to={`/${locale}/product/${product.id}`} className="flex-grow">
          <img
            loading="lazy"
            src={product.image}
            alt="product-foto"
            className="w-full aspect-[3/4] rounded-md mb-2 object-cover"
          />

          <div className="text-md font-bold">{product.name}</div>
          <div className="font-medium text-black/40 mb-2">
            {product.category.name}
          </div>

          {product.is_active ? (
            <span className="font-semibold text-[#1EA1F1] mb-2">
              Есть в наличии
            </span>
          ) : (
            <span className="font-semibold text-red-500 mb-2">
              Нет в наличии
            </span>
          )}

          <div className="font-medium flex-shrink-0">
            {t('price')}: {product.price.toLocaleString()}
          </div>
        </Link>

        <div className="mt-[22px] flex-grow-0">
          {!!product.basket_count && (
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
              className={clsx({
                'btn-disabled border-none': !product.is_active,
              })}
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
