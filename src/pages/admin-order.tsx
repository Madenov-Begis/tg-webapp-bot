import { AdminOrderApi } from '@/features/admin-order/api/admin-order-api'
import { AdminOrderType } from '@/features/admin-order/types/type'
import { HTTPError } from '@/shared/types/Errors'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AdminOrder = () => {
  const { uuid } = useParams()

  const [newOrder, setNewOrder] = useState<AdminOrderType | null>(null)
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getAdminOrder = async () => {
      try {
        setIsloading(true)
        await AdminOrderApi.getOrder(uuid).then((data) =>
          setNewOrder(data.data)
        )
      } catch (error) {
        const err = error as HTTPError

        setError(err.message)
      } finally {
        setIsloading(false)
      }
    }

    getAdminOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!!error && (
        <div className="w-full flex justify-center items-center">
          <ErrorAlert errorText={error} />
        </div>
      )}

      {!isLoading && (
        <div className="bg-gradient-primary/10 min-h-screen p-4">
          <div className="max-w-xl mx-auto bg-white/90 rounded-2xl shadow-soft border border-primary-100 p-6">
            <div className="font-bold text-center text-2xl mb-6 text-primary-500">Новый заказ</div>
            <div className="grid grid-cols-1 gap-3 mb-6">
              <div className="flex justify-between items-center">
                <div className="text-gray-500">ФИО:</div>
                <div className="font-bold text-gray-800">{newOrder?.full_name}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-500">Регистрационный номер:</div>
                <div className="font-bold text-gray-800">{newOrder?.order_id}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-500">Номер телефона:</div>
                <div className="font-bold text-gray-800">{newOrder?.phone}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-500">Адрес:</div>
                <div className="font-bold text-gray-800">{newOrder?.address}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-500">Статус:</div>
                <div className="font-bold px-3 py-1 rounded-full text-xs bg-primary-500 text-white">{newOrder?.status}</div>
              </div>
            </div>
            <div className="space-y-3">
              {newOrder?.items.map((item) => (
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
                    <div className="text-xs text-gray-500">Цена: <span className="font-semibold text-gray-700">{item.product.price}</span></div>
                    <div className="text-xs text-gray-500">Количество: <span className="font-semibold text-gray-700">{item.count} шт</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  )
}

export default AdminOrder
