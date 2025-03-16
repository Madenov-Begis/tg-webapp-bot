import { MyOrdersApi } from '@/features/my-orders/api/my-orders'
import { MyOrdersType } from '@/features/my-orders/types/my-orders-type'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { HTTPError } from '@/shared/types/Errors'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useParams } from 'react-router-dom'

const MyOrders = () => {
  const { locale } = useParams()
  const [myOrders, setMyOrders] = useState<MyOrdersType[] | null>(null)
  const [toggle, setToggle] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getMyOrders = async () => {
      setIsloading(true)
      try {
        await MyOrdersApi.getAll(locale).then((data) => setMyOrders(data.data.data))
      } catch (error) {
        const err = error as HTTPError

        setError(err.message)
      } finally {
        setIsloading(false)
      }
    }
    getMyOrders()
  }, [])

  return (
    <div className="flex flex-col space-y-10 h-screen">
      <div className="font-bold text-center text-xl">Мои заказы</div>
      {!isLoading &&
        myOrders?.map((order) => (
          <>
            <div
              className={clsx(
                'collapse collapse-arrow bg-transparent mb-5 border-2 shadow-md',
                {
                  'collapse-close': toggle,
                }
              )}
              onClick={() => setToggle(!toggle)}
            >
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title text-xl font-medium">
                <div className="flex justify-start items-center gap-5 mb-3">
                  <div>Номер заказа:</div>
                  <div className="font-bold">{order.id}</div>
                </div>
                <div className="flex justify-start items-center gap-5 mb-3">
                  <div>Статус:</div>
                  <div
                    className={clsx('font-bold px-2 py-1 rounded-md', {
                      'bg-blue-400 text-white': order.status === 'pending',
                      'bg-red-500 text-white': order.status === 'rejected',
                      'bg-green-500 text-white': order.status === 'approved',
                    })}
                  >
                    {order.status === 'pending'
                      ? 'В обработке'
                      : order.status === 'rejected'
                      ? 'Отказано'
                      : order.status === 'approved'
                      ? 'Принято'
                      : ''}
                  </div>
                </div>
                <div className="flex justify-start items-center gap-5 mb-3">
                  <div>Дата заказа:</div>
                  <div className="font-bold">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="collapse-content">
                <div>
                  {order.items?.length &&
                    order.items.map((item) => {
                      return (
                        <div
                          className="flex gap-4 rounded-md shadow-sm p-2 mb-5 border"
                          key={item.id}
                        >
                          <img
                            src={item.product.image}
                            alt="product-image"
                            className="w-[28%] h-[100px] rounded-md"
                          />
                          <div className="flex flex-col w-[75%]">
                            <div className="font-bold line-clamp-2">
                              {item.product.title}
                            </div>
                            <div className="flex-grow opacity-50 font-medium">
                              Цена: {item.product.price}
                            </div>
                            <div className="flex-grow opacity-50 font-medium">
                              Количество: {item.count} шт
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </>
        ))}

      {isLoading &&
        (myOrders?.length === 0 ? (
          <div className="w-full flex justify-center items-center basis-[80%]">
            <div className="text-2xl font-semibold">Нет заказы</div>
          </div>
        ) : null)}

      {!!error && (
        <div className="w-full flex justify-center items-center basis-[80%]">
          <ErrorAlert errorText={error} />
        </div>
      )}
    </div>
  )
}

export default MyOrders
