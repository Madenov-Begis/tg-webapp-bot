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
  const [activeOrder, setActiveOrder] = useState<number | null>(null)
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getMyOrders = async () => {
      setIsloading(true)
      try {
        await MyOrdersApi.getAll(locale).then((data) =>
          setMyOrders(data.data.data)
        )
      } catch (error) {
        const err = error as HTTPError

        setError(err.message)
      } finally {
        setIsloading(false)
      }
    }
    getMyOrders()
  }, [locale])

  return (
    <div className="flex flex-col gap-4 h-screen items-start pb-10">
      <div className="font-bold text-center text-xl">Мои заказы</div>
      {!isLoading &&
        myOrders?.map((order) => (
          <>
            <div
              className={clsx(
                'collapse collapse-arrow bg-transparent border border-[#71717133] min-h-max',
                {
                  'collapse-close': activeOrder !== order.id,
                }
              )}
              onClick={() =>
                setActiveOrder((prev) => (prev === order.id ? null : order.id))
              }
            >
              <input type="radio" name={order.id.toString()} />
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
              <div className="collapse-content min-h-max">
                <div className='flex flex-col gap-3'>
                  {order.items?.length &&
                    order.items.map((item) => {
                      return (
                        <div
                          className="flex gap-4 rounded-md shadow-sm p-2 border"
                          key={item.id}
                        >
                          <img
                            src={item.product.image}
                            alt="product-image"
                            className="w-[28%] aspect-[4/3] rounded-md object-cove"
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
        <div className="w-full flex flex-col items-center basis-[80%]">
          <ErrorAlert errorText={'qwdqwd'} />
        </div>
      )}
    </div>
  )
}

export default MyOrders
