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
    <div className="flex flex-col gap-4 items-start bg-gradient-primary/10 min-h-screen p-4">
      <div className="font-bold text-center text-xl">Мои заказы</div>
      {!isLoading &&
        myOrders?.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((order) => (
          <>
            <div
              className={clsx(
                'rounded-2xl bg-white/90 shadow-soft border border-primary-100 mb-2 w-full transition-all',
                {
                  'ring-2 ring-primary-500': activeOrder === order.id,
                }
              )}
              onClick={() =>
                setActiveOrder((prev) => (prev === order.id ? null : order.id))
              }
            >
              <div className="p-4 cursor-pointer select-none">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-500">Номер заказа:</div>
                  <div className="font-bold text-lg text-primary-500">{order.id}</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-500">Статус:</div>
                  <div
                    className={clsx('font-bold px-3 py-1 rounded-full text-xs', {
                      'bg-primary-500 text-white': order.status === 'pending',
                      'bg-red-100 text-red-600': order.status === 'rejected',
                      'bg-green-100 text-green-600': order.status === 'approved',
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
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-500">Дата заказа:</div>
                  <div className="font-bold text-gray-700">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                {activeOrder === order.id && (
                  <div className="mt-4 space-y-2">
                    {order.items?.map((item) => (
                      <div
                        className="flex gap-4 rounded-xl bg-gray-50 border border-gray-200 shadow-soft p-2"
                        key={item.id}
                      >
                        <img
                          src={item.product.image}
                          alt="product-image"
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex flex-col flex-1">
                          <div className="font-bold line-clamp-2 text-gray-800 text-sm mb-1">
                            {item.product.title}
                          </div>
                          <div className="text-xs text-gray-500">Цена: <span className="font-semibold text-gray-700">{Number(item.price).toLocaleString()} сум</span></div>
                          <div className="text-xs text-gray-500">Количество: <span className="font-semibold text-gray-700">{item.count} шт</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ))}

      {myOrders?.length === 0 && (
        <div className="w-full flex justify-center items-center basis-[80%]">
          <div className="text-2xl font-semibold">Нет заказы</div>
        </div>
      )}

      {!!error && (
        <div className="w-full flex flex-col items-center basis-[80%]">
          <ErrorAlert errorText={error} />
        </div>
      )}
    </div>
  )
}

export default MyOrders
