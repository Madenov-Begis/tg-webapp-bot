import { Product } from '../types/types'
import { ProductCard } from './product-card'

interface ProductsListProps {
  isLoading: boolean
  products: Product[] | null
  locale: string | undefined
  handleAddCart: () => void
}

export const ProductsList = ({
  isLoading,
  products,
  locale,
  handleAddCart,
}: ProductsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item} className="skeleton w-full h-[350px]"></div>
        ))}

      {!isLoading &&
        products?.map((product) => (
          <ProductCard
            locale={locale}
            product={product}
            onClick={handleAddCart}
            key={product.id}
          />
        ))}
    </div>
  )
}
