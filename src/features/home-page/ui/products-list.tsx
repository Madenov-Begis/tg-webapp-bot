import { Dispatch, SetStateAction } from 'react'
import { Product } from '../types/types'
import { ProductCard } from './product-card'

interface ProductsListProps {
  isLoading: boolean
  products: Product[] | undefined
  locale: string | undefined
  setBasketCount: Dispatch<SetStateAction<number>>
}

export const ProductsList = ({
  isLoading,
  locale,
  products,
  setBasketCount,
}: ProductsListProps) => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mt-5">
      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item} className="skeleton w-full h-[350px]"></div>
        ))}

      {!isLoading && products && products.length === 0 && (
        <div className="col-span-2 text-center text-gray-500 text-lg py-10">Ничего не найдено</div>
      )}

      {!isLoading &&
        products?.map((product) => {
          return (
            <ProductCard
              locale={locale}
              product={product}
              key={product.id}
              setBasketCount={setBasketCount}
            />
          )
        })}
    </div>
  )
}
