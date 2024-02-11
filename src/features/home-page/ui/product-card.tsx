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
        <div className="flex h-9 max-w-min overflow-hidden rounded-md border border-[#6A3394] mb-5">
          <button
            disabled
            className="fond-bold flex w-10 items-center justify-center bg-[#6A3394] text-sm text-white disabled:cursor-not-allowed disabled:bg-[#F7EEFF] disabled:text-[#6A3394]"
          >
            -
          </button>
          <span className="flex items-center px-4 text-sm font-medium">
            {product.count}
          </span>
          <button className="fond-bold flex w-10 items-center justify-center bg-indigo-600 text-sm text-white disabled:cursor-not-allowed disabled:bg-[#F7EEFF] disabled:text-[#6A3394]">
            +
          </button>
        </div>

        <Button title="Добавить в корзину" onClick={addToCArt} />
      </div>
    </div>
  )
}
