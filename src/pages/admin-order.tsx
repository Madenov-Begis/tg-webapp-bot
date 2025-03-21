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
        <div>
          <div className="font-bold text-center text-xl mb-7">Новый заказ</div>

          <div className="flex justify-start gap-5 mb-3">
            <div>ФИО:</div>
            <div className="font-bold">{newOrder?.full_name}</div>
          </div>
          <div className="flex justify-start gap-5 mb-3">
            <div>Номер телефона:</div>
            <div className="font-bold">{newOrder?.phone}</div>
          </div>
          <div className="flex justify-start gap-5 mb-3">
            <div>Адрес:</div>
            <div className="font-bold">{newOrder?.address}</div>
          </div>
          <div className="flex justify-start gap-5 mb-3">
            <div>Статус:</div>
            <div className="font-bold">{newOrder?.status}</div>
          </div>

          {newOrder?.items.map((item) => {
            return (
              <div
                className="flex gap-4 rounded-md border border-[#71717133] shadow-sm p-2 mb-5"
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
