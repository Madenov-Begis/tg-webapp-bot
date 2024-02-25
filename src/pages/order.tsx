import { CartApi } from '@/features/cart/api/cart-api'
import { OrderApi } from '@/features/order/api/order-api'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { HTTPError } from '@/shared/types/Errors'
import { Button, Input } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useHookFormMask } from 'use-mask-input'

interface IFormInput {
  full_name: string
  phone: string
  address: string
  basket_ids: number[]
}

const Order = () => {
  const { tg, user } = useTelegram()
  const navigate = useNavigate()
  const { locale } = useParams()

  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined)
  const [deliverPrice, setDeliverPrice] = useState<number | undefined>(
    undefined
  )
  const [basketIds, setBasketIds] = useState<number[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  console.log(isLoading)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      full_name: '',
      phone: '',
      address: '',
      basket_ids: [],
    },
  })
  const registerWithMask = useHookFormMask(register)

  const getBasket = async () => {
    try {
      await CartApi.getAll(user.id).then((data) => {
        setBasketIds(data.baskets?.map((basket) => basket.id))
        setTotalPrice(data.total_price)
        setDeliverPrice(data.deleviry_price)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBasket()
  }, [])

  useEffect(() => {
    tg.BackButton.show()

    tg.BackButton.onClick(() => {
      navigate(`/${locale}/cart`)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true)
      await OrderApi.orderCreate({
        body: { ...data, basket_ids: basketIds, phone: data.phone.slice(1) },
        userId: user.id,
      }).then(() => {
        setErrorText('')
        navigate(`/${locale}`)
        tg.showAlert('Ваш заказ успешно оформлен')
        reset()
      })
    } catch (error) {
      const err = error as HTTPError

      setErrorText(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    tg.MainButton.hide()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative flex flex-col h-[calc(100vh-45px)]">
      <div className="text-center font-bold text-lg mb-5">
        Оформление заказа
      </div>
      {errorText && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorText}</span>
        </div>
      )}
      <form className="flex-grow" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="ФИО"
          label="ФИО"
          icon={false}
          type="text"
          error={!!errors.full_name}
          errorMessage={errors.full_name?.message}
          {...register('full_name', { required: 'Обязательное поле' })}
        />
        {/* <Input
          placeholder="Номер телефона"
          label="Номер телефона"
          icon={false}
          type="number"
          error={!!errors.phone}
          errorMessage={errors.phone?.message}
          // setKeyWord={() => {}}
          {...register('phone', { required: 'Обязательное поле' })}
        /> */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium">{'Номер телефона'}</span>
          </div>
          <input
            type={'text'}
            placeholder={'+998 00 000 00 00'}
            className="input input-bordered input-secondary w-full"
            {...registerWithMask('phone', '+999999999999', {
              required: 'Обязательное поле',
            })}
          />
          {errors.phone && (
            <div className="label">
              <span className="label-text-alt text-red-500">
                {errors.phone.message}
              </span>
            </div>
          )}
        </label>

        <Input
          placeholder="Адрес"
          label="Адрес"
          icon={false}
          type="text"
          error={!!errors.address}
          errorMessage={errors.address?.message}
          // setKeyWord={() => {}}
          {...register('address', { required: 'Обязательное поле' })}
        />

        <Button
          title="Заказать"
          onClick={handleSubmit(onSubmit)}
          className="mt-10"
          loading={isLoading}
          disabled={isLoading}
        />
      </form>

      <div className="flex-grow-0 p-3 mt-10 rounded-t-md shadow-md border text-xl">
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

export default Order
