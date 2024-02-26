import { IconButton } from '@/shared/ui/icon-button/icon-button'
import { CartItem } from '../types/cart-types'

interface CartItemProps {
  item: CartItem
  handleMinusCount: (id: number, count: number) => void
  handleAddCount: (id: number) => void
  handleDelete: (id: number) => void
  isMinusLoading: number | null
  isPlusLoading: number | null
  isDeleteLoading: number | null
}

export const CartPoduct = (props: CartItemProps) => {
  const {
    item,
    handleMinusCount,
    handleAddCount,
    handleDelete,
    isMinusLoading,
    isPlusLoading,
    isDeleteLoading,
  } = props
  return (
    <div className="flex gap-4 rounded-md shadow-md p-2 mb-5" key={item.id}>
      <img
        src={item.product.image}
        alt="product-image"
        className="w-[28%] h-[100px] rounded-md"
      />
      <div className="flex flex-col w-[75%]">
        <div className="font-bold line-clamp-2">{item.product.title}</div>
        <div className="flex-grow opacity-50 font-medium">
          Цена: {item.product.price}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center flex-grow-0">
            <IconButton
              onClick={() => handleMinusCount(item.id, item.count)}
              loading={isMinusLoading === item.id ? true : false}
              disabled={isMinusLoading === item.id ? true : false}
            >
              &minus;
            </IconButton>
            <span className="flex items-center px-4 text-md font-medium">
              {item.count}
            </span>
            <IconButton
              onClick={() => handleAddCount(item.id)}
              loading={isPlusLoading === item.id ? true : false}
              disabled={isPlusLoading === item.id ? true : false}
            >
              &#43;
            </IconButton>
          </div>

          <IconButton
            className="btn btn-circle"
            onClick={() => handleDelete(item.id)}
            loading={isDeleteLoading === item.id ? true : false}
            disabled={isDeleteLoading === item.id ? true : false}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0779 5.91763C12.0779 5.91763 11.7386 10.127 11.5417 11.9001C11.4479 12.747 10.9248 13.2433 10.0679 13.2589C8.43731 13.2883 6.80481 13.2901 5.17481 13.2558C4.35044 13.2389 3.83606 12.7364 3.74419 11.9045C3.54606 10.1158 3.20856 5.91763 3.20856 5.91763M12.9425 3.89983H2.34375M10.9003 3.89982C10.4096 3.89982 9.98713 3.55294 9.89088 3.07232L9.739 2.31232C9.64525 1.96169 9.32775 1.71919 8.96588 1.71919H6.32025C5.95838 1.71919 5.64088 1.96169 5.54713 2.31232L5.39525 3.07232C5.299 3.55294 4.8765 3.89982 4.38588 3.89982"
                stroke="#fff"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
