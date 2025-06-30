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

  const [basketIds, setBasketIds] = useState<number[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setError,
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

      if (err.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
          const errorMessage = Array.isArray(message) ? message[0] : message
          setError(field as keyof IFormInput, {
            type: 'server',
            message: errorMessage,
          })
        })
      } else {
        setErrorText(err.message)
      }
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
          {...register('address', {
            required: t('required'),
            minLength: {
              value: 5,
              message: 'Адрес должен содержать минимум 5 символов',
            },
          })}
        />
        <Button
          title={t('order')}
          onClick={handleSubmit(onSubmit)}
          className="mt-10"
          loading={isLoading}
          disabled={isLoading}
          variant={isLoading ? 'disable' : 'primary'}
        />
      </form>

      <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200 rounded-t-2xl shadow-strong p-6 mt-6 animate-fade-in">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">
                {t('allPrice')}:
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {totalPrice ? Number(totalPrice).toLocaleString() : ''}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">
              {t('itogo')}:
            </span>
            <div className="text-2xl font-bold text-primary-500">
              {Number(totalPrice).toLocaleString()}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
