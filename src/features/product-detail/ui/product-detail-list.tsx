import { Button } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { ProductDetail } from '../types/product-detail'
import { ProductDetailApi } from '../api/product-detail-api'
import { useParams } from 'react-router-dom'
import { HomePageApi } from '@/features/home-page/api/home-page-api'
import clsx from 'clsx'

export const ProductDetailList = () => {
  const { id, locale } = useParams()

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getProductOne = async () => {
      try {
        setIsFetching(true)
        await ProductDetailApi.getProductDetail({ locale, productId: id }).then(
          (data) => setProduct(data.data)
        )
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
      }
    }
    getProductOne()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addToCArt = async (productId: number | undefined) => {
    try {
      setIsLoading(true)
      await HomePageApi.addToBasket({
        body: {
          count: 1,
          product_id: productId,
        },
      }).then(() => {
        if (product) {
          setProduct({
            ...product,
            basket_count: 1,
          })
        }
      })
    } catch (error) {
      const err = error as Error

      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-45px)] bg-gradient-primary/10">
        <div className="flex-grow p-4">
          {isFetching && (
            <div className="skeleton rounded-2xl w-full h-[350px] mb-4"></div>
          )}
          {!isFetching && (
            <div className="relative rounded-2xl overflow-hidden shadow-soft mb-4 bg-white/80">
              <img
                src={product?.image}
                loading="lazy"
                alt="product-image"
                className="w-full h-[320px] object-contain"
              />
              {product?.is_active ? (
                <span className="absolute top-3 right-3 bg-gradient-to-r from-primary-400 to-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-soft">В наличии</span>
              ) : (
                <span className="absolute top-3 right-3 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-soft">Нет в наличии</span>
              )}
            </div>
          )}

          {isFetching && (
            <div className="skeleton rounded-md mt-5 w-full h-[28px] mb-2"></div>
          )}
          {!isFetching && (
            <div className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{product?.title}</div>
          )}

          {isFetching && (
            <div className="skeleton rounded-md w-1/3 h-[20px] mt-2 mb-2"></div>
          )}
          {!isFetching && (
            <div className="inline-block bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
              {product?.category.name}
            </div>
          )}

          {isFetching && (
            <div className="skeleton rounded-md w-1/2 h-[32px] mt-2 mb-2"></div>
          )}
          {!isFetching && (
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent mb-4">
              {Number(product?.price)?.toLocaleString()} сум
            </div>
          )}

          {isFetching && (
            <>
              <div className="skeleton rounded-md w-full h-[18px] mt-5"></div>
              <div className="skeleton rounded-md w-full h-[18px] mt-2"></div>
              <div className="skeleton rounded-md w-full h-[18px] mt-2"></div>
              <div className="skeleton rounded-md w-full h-[18px] mt-2"></div>
              <div className="skeleton rounded-md w-full h-[18px] mt-2"></div>
            </>
          )}
          {!isFetching && (
            <>
              <div className="font-bold text-lg mb-1 text-gray-800">Описание</div>
              <div className="text-gray-700 leading-relaxed mb-4">{product?.description}</div>
            </>
          )}
        </div>
        <div className="flex-grow-0 p-4">
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}

          {!!product?.basket_count && (
            <Button
              title="Добавлено в корзину"
              loading={isLoading}
              onClick={() => {}}
              className="btn-lg  btn-disabled border-none mt-4bg-green-50"
              variant="disable"
            />
          )}
          {!product?.basket_count && (
            <Button
              title="Добавить в корзину"
              loading={isLoading}
              className={clsx('btn-lg mt-4', {
                'btn-disabled border-none ': !product?.is_active,
              })}
              onClick={() => {
                addToCArt(product?.id)
              }}
              variant={!product?.is_active ? 'disable' : 'primary'}
            />
          )}
        </div>
      </div>
    </>
  )
}
