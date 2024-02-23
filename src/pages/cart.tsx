import { useTelegram } from '@/shared/hooks/useTelegram'
import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'

const Cart = () => {
  const { tg } = useTelegram()

  useEffect(() => {
    tg.BackButton.show()

    tg.BackButton.onClick(() => {
      history.back()
    })
  })

  useEffect(() => {
    tg.MainButton.show()
    tg.MainButton.setText('Заказать')
  })

  return (
    <div className="flex flex-col h-[calc(100vh-45px)]">
      <div className="text-center font-bold text-lg mb-5">Корзина</div>

      <div className="flex-grow">
        <div className="flex gap-4 rounded-md shadow-md p-2 mb-5">
          <div className="w-[28%] h-[120px] bg-gray-400 rounded-sm"></div>
          <div className="flex flex-col w-[75%]">
            <div className="font-bold line-clamp-2">Крем</div>
            <div className="flex-grow opacity-50 font-medium">
              Цена: 200.000
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center flex-grow-0">
                <button
                  disabled
                  className="fond-bold flex w-8 h-8 items-center justify-center border border-[#dedede] rounded-full text-xl opacity-60"
                >
                  &minus;
                </button>
                <span className="flex items-center px-4 text-md font-medium">
                  1
                </span>
                <button className="fond-bold flex w-8 h-8 items-center justify-center border border-[#dedede] rounded-full text-xl opacity-60">
                  &#43;
                </button>
              </div>

              <div className="flex w-8 h-8 items-center justify-center border border-[#dedede] rounded-full cursor-pointer">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0779 5.91763C12.0779 5.91763 11.7386 10.127 11.5417 11.9001C11.4479 12.747 10.9248 13.2433 10.0679 13.2589C8.43731 13.2883 6.80481 13.2901 5.17481 13.2558C4.35044 13.2389 3.83606 12.7364 3.74419 11.9045C3.54606 10.1158 3.20856 5.91763 3.20856 5.91763M12.9425 3.89983H2.34375M10.9003 3.89982C10.4096 3.89982 9.98713 3.55294 9.89088 3.07232L9.739 2.31232C9.64525 1.96169 9.32775 1.71919 8.96588 1.71919H6.32025C5.95838 1.71919 5.64088 1.96169 5.54713 2.31232L5.39525 3.07232C5.299 3.55294 4.8765 3.89982 4.38588 3.89982"
                    stroke="#8F959E"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 rounded-md shadow-md p-2 mb-5">
          <div className="w-[28%] h-[120px] bg-gray-400 rounded-sm"></div>
          <div className="flex flex-col w-[75%]">
            <div className="font-bold line-clamp-2">Крем</div>
            <div className="flex-grow opacity-50 font-medium">
              Цена: 200.000
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center flex-grow-0">
                <button
                  disabled
                  className="fond-bold flex w-8 h-8 items-center justify-center border border-[#dedede] rounded-full text-xl opacity-60"
                >
                  &minus;
                </button>
                <span className="flex items-center px-4 text-md font-medium">
                  1
                </span>
                <button className="fond-bold flex w-8 h-8 items-center justify-center border border-[#dedede] rounded-full text-xl opacity-60">
                  &#43;
                </button>
              </div>

              <div className="flex w-8 h-8 items-center justify-center border border-[#dedede] rounded-full cursor-pointer">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0779 5.91763C12.0779 5.91763 11.7386 10.127 11.5417 11.9001C11.4479 12.747 10.9248 13.2433 10.0679 13.2589C8.43731 13.2883 6.80481 13.2901 5.17481 13.2558C4.35044 13.2389 3.83606 12.7364 3.74419 11.9045C3.54606 10.1158 3.20856 5.91763 3.20856 5.91763M12.9425 3.89983H2.34375M10.9003 3.89982C10.4096 3.89982 9.98713 3.55294 9.89088 3.07232L9.739 2.31232C9.64525 1.96169 9.32775 1.71919 8.96588 1.71919H6.32025C5.95838 1.71919 5.64088 1.96169 5.54713 2.31232L5.39525 3.07232C5.299 3.55294 4.8765 3.89982 4.38588 3.89982"
                    stroke="#8F959E"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 rounded-md shadow-md p-2 mb-5">
          <div className="w-[28%] h-[120px] bg-gray-400 rounded-sm"></div>
          <div className="flex flex-col w-[75%]">
            <div className="font-bold line-clamp-2">Крем</div>
            <div className="flex-grow opacity-50 font-medium">
              Цена: 200.000
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center flex-grow-0">
                <button
                  disabled
                  className="fond-bold flex w-8 h-8 items-center justify-center border border-[#dedede] rounded-full text-xl opacity-60"
                >
                  &minus;
                </button>
                <span className="flex items-center px-4 text-md font-medium">
                  1
                </span>
                <button className="fond-bold flex w-8 h-8 items-center justify-center border border-[#dedede] rounded-full text-xl opacity-60">
                  &#43;
                </button>
              </div>

              <div className="flex w-8 h-8 items-center justify-center border border-[#dedede] rounded-full cursor-pointer">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0779 5.91763C12.0779 5.91763 11.7386 10.127 11.5417 11.9001C11.4479 12.747 10.9248 13.2433 10.0679 13.2589C8.43731 13.2883 6.80481 13.2901 5.17481 13.2558C4.35044 13.2389 3.83606 12.7364 3.74419 11.9045C3.54606 10.1158 3.20856 5.91763 3.20856 5.91763M12.9425 3.89983H2.34375M10.9003 3.89982C10.4096 3.89982 9.98713 3.55294 9.89088 3.07232L9.739 2.31232C9.64525 1.96169 9.32775 1.71919 8.96588 1.71919H6.32025C5.95838 1.71919 5.64088 1.96169 5.54713 2.31232L5.39525 3.07232C5.299 3.55294 4.8765 3.89982 4.38588 3.89982"
                    stroke="#8F959E"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow-0 p-3 rounded-t-md shadow-md border">
        <div className="flex justify-between items-center">
          <div>Сумма товаров:</div>
          <div>400.000 сум</div>
        </div>
        <div className="flex justify-between items-center">
          <div>Доставка:</div>
          <div>0 сум</div>
        </div>
        <div className="flex justify-between items-center border-t pt-3 mt-3">
          <div className="font-bold text-lg">Итого:</div>
          <div>400.000 сум</div>
        </div>
      </div>
    </div>
  )
}

export default Cart
