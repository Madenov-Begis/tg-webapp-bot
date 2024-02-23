import { Button } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { ProductDetail } from '../types/product-detail'
import { ProductDetailApi } from '../api/product-detail-api'
import { useParams } from 'react-router-dom'
import { HomePageApi } from '@/features/home-page/api/home-page-api'
import { useTelegram } from '@/shared/hooks/useTelegram'

export const ProductDetailList = () => {
  const { user } = useTelegram()
  const { id } = useParams()

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // const { addToCArt, isLoading, error } = useAddToCart()

  useEffect(() => {
    const getProductOne = async () => {
      try {
        setIsFetching(true)
        await ProductDetailApi.getProductDetail(id).then((data) =>
          setProduct(data)
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
        count: 1,
        product_id: productId,
        customer_id: user?.id || 1,
      })
      setProduct({
        category: product?.category ? product.category : undefined,
        description: product?.description ? product.description : undefined,
        id: product?.id ? product.id : undefined,
        image: product?.image ? product.image : undefined,
        price: product?.price ? product.price : undefined,
        title: product?.title ? product.title : undefined,
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
            <div className="skeleton rounded-md w-full h-[300px]"></div>
          )}
          {!isFetching && (
            <img
              src={product?.image}
              loading="lazy"
              alt="product-image"
              className="w-full h-[300px] rounded-md"
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
            <div className="font-medium text-black/40 mt-2">
              {product?.category}
            </div>
          )}

          {isFetching && (
            <div className="skeleton rounded-md w-1/2 h-[32px] mt-5 mb-2"></div>
          )}
          {!isFetching && (
            <div className="font-medium text-2xl flex-grow mb-2 mt-5">
              Цена: {product?.price}
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
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo
                provident officia ex quibusdam quidem, suscipit aperiam sequi,
                nemo earum culpa voluptatum, quasi sint eius sunt voluptatem
                alias vel ab nulla!
              </div>
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
              className="btn-disabled border-none btn-lg"
            />
          )}
          {!product?.basket_count && (
            <Button
              title="Добавить в корзину"
              loading={isLoading}
              onClick={() => {
                addToCArt(product?.id)
              }}
              className="btn-lg"
            />
          )}
        </div>
      </div>
    </>
  )
}
