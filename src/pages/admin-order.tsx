import { AdminOrderApi } from '@/features/admin-order/api/admin-order-api'
import { AdminOrderType } from '@/features/admin-order/types/type'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AdminOrder = () => {
  const { uuid } = useParams()

  const [newOrder, setNewOrder] = useState<AdminOrderType | null>(null)

  useEffect(() => {
    const getAdminOrder = async () => {
      try {
        await AdminOrderApi.getOrder(uuid).then((data) => setNewOrder(data))
      } catch (error) {
        console.log(error)
      }
    }

    getAdminOrder()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {newOrder ? (
        <div>
          <div className="font-bold text-center text-xl mb-10">Новый заказ</div>

          <div className="flex justify-start gap-5 mb-3">
            <div>ФИО:</div>
            <div className="font-bold">{newOrder.full_name}</div>
          </div>
          <div className="flex justify-start gap-5 mb-3">
            <div>Номер телефона:</div>
            <div className="font-bold">{newOrder.phone}</div>
          </div>
          <div className="flex justify-start gap-5 mb-3">
            <div>Адрес:</div>
            <div className="font-bold">{newOrder.address}</div>
          </div>
          <div className="flex justify-start gap-5 mb-3">
            <div>Статус:</div>
            <div className="font-bold">{newOrder.status}</div>
          </div>

          {newOrder.items.map((item) => {
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
                  <div className="flex-grow opacity-50 font-medium">
                    Количество: {item.count} шт
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  )
}

export default AdminOrder
