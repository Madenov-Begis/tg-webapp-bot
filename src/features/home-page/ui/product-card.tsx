import { Link } from 'react-router-dom'
import { Button } from '../../../shared/ui'
import { Product } from '../types/types'

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const addToCArt = () => {
    onClick(product)
  }

  return (
    <div key={product.id} className="p-[15px] rounded-md shadow-lg gap-5">
      <Link to={'/product'}>
        <div className="bg-gray-200 w-full h-[200px] rounded-md mb-2"></div>

        <div className="text-lg font-bold">{product.name}</div>
        <div className="font-medium text-black/40 mb-2">{product.category}</div>
        <div className="font-medium flex-grow">Цена: {product.price}</div>
      </Link>

      <div className="mt-[22px]">
        {/* <div className="w-full flex justify-between rounded-md border border-indigo-600 bg-indigo-600 px-8 py-5 font-medium text-white active:translate-y-[2px]'">
          <button
            disabled
            className="fond-bold flex items-center justify-center text-sm text-white"
          >
            -
          </button>
          <span className="flex items-center px-4 text-sm font-medium">
            {product.count}
          </span>
          <button
            onClick={addToCArt}
            className="fond-bold flex items-center text-sm justify-center text-white"
          >
            +
          </button>
        </div> */}

        <Button title="Добавить в корзину" onClick={addToCArt} />
      </div>
    </div>
  )
}
