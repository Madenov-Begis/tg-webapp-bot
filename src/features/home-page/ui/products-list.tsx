import { Product } from '../types/types'
import { ProductCard } from './product-card'

interface ProductsListProps {
  isLoading: boolean
  products: Product[]
  locale: string | undefined
}

export const ProductsList = ({
  isLoading,
  locale,
  products,
}: ProductsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item} className="skeleton w-full h-[350px]"></div>
        ))}

      {!isLoading &&
        products?.map((product) => {
          return (
            <ProductCard locale={locale} product={product} key={product.id} />
          )
        })}
    </div>
  )
}
