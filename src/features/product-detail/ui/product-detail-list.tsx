import { Button } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { ProductDetail } from '../types/product-detail'
import { ProductDetailApi } from '../api/product-detail-api'
import { useParams } from 'react-router-dom'
import { HomePageApi } from '@/features/home-page/api/home-page-api'

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
          (data) => setProduct(data)
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
      })
      setProduct({
        category: product?.category ? product.category : undefined,
        description: product?.description ? product.description : undefined,
        id: product?.id ? product.id : undefined,
        image: product?.image ? product.image : undefined,
        price: product?.price ? product.price : undefined,
        title: product?.title ? product.title : undefined,
        status: product?.status ? product.status : undefined,
        basket_count: 1,
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
      <div className="flex flex-col h-[calc(100vh-45px)]">
        <div className="flex-grow">
          {isFetching && (
            <div className="skeleton rounded-md w-full h-[350px]"></div>
          )}
          {!isFetching && (
            <img
              src={product?.image}
              loading="lazy"
              alt="product-image"
              className="w-full h-[350px] rounded-md"
            />
          )}

          {isFetching && (
            <div className="skeleton rounded-md mt-5 w-full h-[28px]"></div>
          )}
          {!isFetching && (
            <div className="text-xl mt-5 font-bold">{product?.title}</div>
          )}

          {isFetching && (
            <div className="skeleton rounded-md w-1/3 h-[20px] mt-2"></div>
          )}
          {!isFetching && (
            <div className="font-medium text-black/40 mt-2 mb-2">
              {product?.category}
            </div>
          )}

          {!isFetching &&
            (product?.status ? (
              <span className="font-semibold text-[#1EA1F1] mb-2">
                Есть в наличии
              </span>
            ) : (
              <span className="font-semibold text-red-500 mb-2">
                Нет в наличии
              </span>
            ))}

          {isFetching && (
            <div className="skeleton rounded-md w-1/2 h-[32px] mt-2 mb-2"></div>
          )}
          {!isFetching && (
            <div className="font-medium text-2xl flex-grow mb-2 mt-2">
              Цена: {product?.price?.toLocaleString()}
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
              <div className="font-bold">Описание</div>
              <div>{product?.description}</div>
            </>
          )}
        </div>
        <div className="flex-grow-0">
          {error && <div>{error}</div>}

          {product?.basket_count && (
            <Button
              title="Добавлено в корзину"
              loading={isLoading}
              onClick={() => {}}
              className="btn-disabled border-none btn-lg mt-8"
            />
          )}
          {!product?.basket_count && (
            <Button
              title="Добавить в корзину"
              loading={isLoading}
              onClick={() => {
                addToCArt(product?.id)
              }}
              className="btn-lg mt-8"
            />
          )}
        </div>
      </div>
    </>
  )
}
