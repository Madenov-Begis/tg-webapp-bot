import { useTelegram } from '@/shared/hooks/useTelegram'
import { Button } from '@/shared/ui'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ProductDetail = () => {
  const loaction = useLocation()

  const { tg } = useTelegram()
  console.log(loaction)

  useEffect(() => {
    tg.BackButton.show()

    tg.BackButton.onClick(() => {
      history.back()
    })
  })

  // useEffect(() => {
  //   if (selectedProducts.length) {
  //     tg.MainButton.show()
  //     tg.MainButton.setText(`Перейти в корзину (${selectedProducts.length})`)
  //     tg.MainButton.onClick(() => navigate('/cart'))
  //   }
  // })

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <div className="bg-gray-200 w-full h-[300px] rounded-md mb-2"></div>

        <div className="text-lg font-bold">Крем для рук</div>
        <div className="font-medium text-black/40 mb-2">Косметика</div>
        <div className="font-medium flex-grow mb-2">Цена: 200.000</div>
        <div className="font-bold">Описание</div>

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          modi voluptas accusamus, impedit neque omnis cumque ab odio pariatur
          voluptatibus.
        </div>
      </div>
      <div className="flex-grow-0">
        <div className="flex h-9 max-w-min overflow-hidden rounded-md border border-[#6A3394] mb-5">
          <button
            disabled
            className="fond-bold flex w-10 items-center justify-center bg-[#6A3394] text-sm text-white disabled:cursor-not-allowed disabled:bg-[#F7EEFF] disabled:text-[#6A3394]"
          >
            -
          </button>
          <span className="flex items-center px-4 text-sm font-medium">1</span>
          <button className="fond-bold flex w-10 items-center justify-center bg-indigo-600 text-sm text-white disabled:cursor-not-allowed disabled:bg-[#F7EEFF] disabled:text-[#6A3394]">
            +
          </button>
        </div>

        <Button title="Добавить в корзину" onClick={() => {}} />
      </div>
    </div>
  )
}

export default ProductDetail
