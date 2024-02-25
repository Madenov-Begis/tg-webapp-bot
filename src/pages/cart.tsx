import { CartApi } from '@/features/cart/api/cart-api'
import { CartItem } from '@/features/cart/types/cart-types'
import useFirstRender from '@/shared/hooks/useFirstRender'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { IconButton } from '@/shared/ui/icon-button/icon-button'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Cart = () => {
  const isFirstRender = useFirstRender()
  const { tg, user } = useTelegram()
  const navigate = useNavigate()
  const { locale } = useParams()

  useEffect(() => {
    tg.BackButton.show()

    tg.BackButton.onClick(() => {
      navigate(`/${locale}`)
    })
  })

  const [cartItem, setCartItem] = useState<CartItem[] | null>(null)
  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined)
  const [deliverPrice, setDeliverPrice] = useState<number | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteLoading, setDeleteIsloading] = useState<number | null>(null)
  const [isPlusLoading, setPlusLoading] = useState<number | null>(null)
  const [isMinusLoading, setMinusLoading] = useState<number | null>(null)

  const getBasket = async () => {
    try {
      if (isFirstRender) setIsLoading(true)

      await CartApi.getAll(user.id).then((data) => {
        setCartItem(data.baskets)
        setTotalPrice(data.total_price)
        setDeliverPrice(data.deleviry_price)
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isFirstRender) getBasket()
  }, [isFirstRender])

  const handleDelete = async (id: number) => {
    try {
      setDeleteIsloading(id)
      await CartApi.delete({ id, user_id: user.id })
      getBasket()
    } catch (error) {
      console.log(error)
    } finally {
      setDeleteIsloading(null)
    }
  }

  const handleAddCount = async (id: number) => {
    try {
      setPlusLoading(id)
      await CartApi.changeCount({ id, body: { count: 1 }, user_id: user.id })
      getBasket()
    } catch (error) {
      console.log(error)
    } finally {
      setPlusLoading(null)
    }
  }

  const handleMinusCount = async (id: number, count: number) => {
    try {
      if (count > 1) {
        setMinusLoading(id)
        await CartApi.changeCount({ id, body: { count: -1 }, user_id: user.id })

        getBasket()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setMinusLoading(null)
    }
  }

  useEffect(() => {
    if (cartItem?.length) {
      tg.MainButton.show()
      tg.MainButton.setText('Перейти к оформлению')
      tg.MainButton.onClick(() => navigate(`/${locale}/order`))
    }
    if (!cartItem?.length) {
      tg.MainButton.hide()
    }

    return () => {
      tg.MainButton.offClick(() => navigate('/order'))
    }
  }, [cartItem?.length])

  return (
    <div className="flex flex-col h-[calc(100vh-45px)]">
      <div className="text-center font-bold text-lg mb-5">Корзина</div>
      <div className="flex-grow">
        {isLoading &&
          [1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton w-full h-[110px] mb-5"></div>
          ))}

        {!isLoading &&
          cartItem?.map((item) => {
            return (
              <div
                className="flex gap-4 rounded-md shadow-md p-2 mb-5"
                key={item.id}
              >
                <img
                  src={item.product.image}
                  alt="product-image"
                  className="w-[28%] h-[120px]rounded-sm"
                />
                <div className="flex flex-col w-[75%]">
                  <div className="font-bold line-clamp-2">
                    {item.product.title}
                  </div>
                  <div className="flex-grow opacity-50 font-medium">
                    Цена: {item.product.price}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center flex-grow-0">
                      <IconButton
                        onClick={() => handleMinusCount(item.id, item.count)}
                        loading={isMinusLoading === item.id ? true : false}
                      >
                        &minus;
                      </IconButton>
                      <span className="flex items-center px-4 text-md font-medium">
                        {item.count}
                      </span>
                      <IconButton
                        onClick={() => handleAddCount(item.id)}
                        loading={isPlusLoading === item.id ? true : false}
                      >
                        &#43;
                      </IconButton>
                    </div>

                    <IconButton
                      className="btn btn-circle"
                      onClick={() => handleDelete(item.id)}
                      loading={isDeleteLoading === item.id ? true : false}
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
          })}
      </div>

      <div className="flex-grow-0 p-3 rounded-t-md shadow-md border text-xl mt-5">
        <div className="flex justify-between items-center">
          <div>Сумма товаров:</div>
          <div>{totalPrice?.toLocaleString()} сум</div>
        </div>
        <div className="flex justify-between items-center">
          <div>Доставка:</div>
          <div>{deliverPrice} сум</div>
        </div>
        <div className="flex justify-between items-center border-t pt-3 mt-3">
          <div className="font-bold text-2xl">Итого:</div>
          <div className="font-bold text-2xl">
            {totalPrice?.toLocaleString()} сум
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
