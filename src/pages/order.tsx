import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { CartApi } from '@/features/cart/api/cart-api'
import { OrderApi } from '@/features/order/api/order-api'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { HTTPError } from '@/shared/types/Errors'
import { Button, InputRef } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

interface IFormInput {
  full_name: string
  phone: string
  address: string
  order_id: string
  basket_ids: number[]
}

const Order = () => {
  const { t } = useTranslation()

  const { tg } = useTelegram()
  const navigate = useNavigate()
  const { locale } = useParams()

  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined)
  const [deliverPrice, setDeliverPrice] = useState<number | undefined>(
    undefined
  )
  const [basketIds, setBasketIds] = useState<number[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      full_name: '',
      phone: '',
      address: '',
      order_id: '',
      basket_ids: [],
    },
  })

  const getBasket = async () => {
    try {
      await CartApi.getAll(locale).then((data) => {
        setBasketIds(data.data.baskets?.map((basket) => basket.id))
        setTotalPrice(data.data.total_price)
        setDeliverPrice(data.data.deleviry_price)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBasket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    tg.MainButton.hide()
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
        body: {
          ...data,
          basket_ids: basketIds,
          phone: data.phone.slice(1),
          order_id: data.order_id,
        },
        locale,
      }).then(() => {
        setErrorText('')
        navigate(`/${locale}`)
        tg.showAlert(t('successOrder'))
        reset()
      })
    } catch (error) {
      const err = error as HTTPError

      setErrorText(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col h-[calc(100vh-45px)]">
      <div className="text-center font-bold text-lg mb-5">
        {t('orderProduct')}
      </div>
      {errorText && (
        <div role="alert" className="alert alert-error nowrap">
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
        <InputRef
          placeholder={t('register_number')}
          label={t('register_number')}
          icon={false}
          type="tel"
          error={!!errors.order_id}
          errorMessage={errors.order_id?.message}
          {...register('order_id', { required: t('required') })}
        />

        <InputRef
          placeholder="ФИО"
          label="ФИО"
          icon={false}
          type="text"
          error={!!errors.full_name}
          errorMessage={errors.full_name?.message}
          {...register('full_name', { required: t('required') })}
        />

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-medium">{t('phone')}</span>
          </div>
          <Controller
            name={'phone'}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, name, value } }) => (
              <PatternFormat
                type="tel"
                placeholder="+998 00 000 00 00"
                format="+998 ## ### ## ##"
                allowEmptyFormatting
                mask=" "
                className="input input-bordered input-secondary w-full"
                name={name}
                onChange={onChange}
                value={value}
                required={true}
              />
            )}
          />
          {errors.phone && (
            <div className="label">
              <span className="label-text-alt text-red-500">
                {t('required')}
              </span>
            </div>
          )}
        </label>

        <InputRef
          placeholder={t('address')}
          label={t('address')}
          icon={false}
          type="text"
          error={!!errors.address}
          errorMessage={errors.address?.message}
          {...register('address', { required: t('required') })}
        />
        <Button
          title={t('order')}
          onClick={handleSubmit(onSubmit)}
          className="mt-10"
          loading={isLoading}
          disabled={isLoading}
        />
      </form>

      <div className="flex-grow-0 p-3 mt-10 rounded-t-md shadow-md border text-xl">
        <div className="flex justify-between items-center">
          <div>{t('allPrice')}:</div>
          <div>{totalPrice?.toLocaleString()} сум</div>
        </div>
        <div className="flex justify-between items-center">
          <div>{t('deliver')}:</div>
          <div>{deliverPrice} сум</div>
        </div>
        <div className="flex justify-between items-center border-t pt-3 mt-3">
          <div className="font-bold text-2xl">{t('itogo')}:</div>
          <div className="font-bold text-2xl">
            {totalPrice?.toLocaleString()} сум
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
