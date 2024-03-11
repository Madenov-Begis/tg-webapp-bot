import { CartApi } from '@/features/cart/api/cart-api'
import { CartItem } from '@/features/cart/types/cart-types'
import { CartFooter } from '@/features/cart/ui/cart-footer'
import { CartPoduct } from '@/features/cart/ui/cart-product'
import useFirstRender from '@/shared/hooks/useFirstRender'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Cart = () => {
  const isFirstRender = useFirstRender()
  const { tg } = useTelegram()
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

      await CartApi.getAll().then((data) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstRender])

  const handleDelete = async (id: number) => {
    try {
      setDeleteIsloading(id)
      await CartApi.delete({ id })
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
      await CartApi.changeCount({ id, body: { count: 1 } })
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
        await CartApi.changeCount({ id, body: { count: -1 } })

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
      tg.MainButton.offClick(() => navigate(`/${locale}/order`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <CartPoduct
                item={item}
                isDeleteLoading={isDeleteLoading}
                isPlusLoading={isPlusLoading}
                isMinusLoading={isMinusLoading}
                handleDelete={handleDelete}
                handleAddCount={handleAddCount}
                handleMinusCount={handleMinusCount}
              />
            )
          })}
      </div>

      <CartFooter deliverPrice={deliverPrice} totalPrice={totalPrice} />
    </div>
  )
}

export default Cart
