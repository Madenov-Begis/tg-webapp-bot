import { Button } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { ProductDetail } from '../types/product-detail'
import { ProductDetailApi } from '../api/product-detail-api'
import { useParams } from 'react-router-dom'

export const ProductDetailList = () => {
  const { id } = useParams()

  const [product, setProduct] = useState<ProductDetail>()

  useEffect(() => {
    const getProductOne = async () => {
      try {
        await ProductDetailApi.getProductDetail(id).then((data) =>
          setProduct(data)
        )
      } catch (error) {
        console.log(error)
      }
    }
    getProductOne()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <img
          src={product?.image}
          loading="lazy"
          alt="product-image"
          className="w-full h-[300px] rounded-md mb-2"
        />

        <div className="text-lg font-bold">{product?.title}</div>
        <div className="font-medium text-black/40 mb-2">
          {product?.category}
        </div>
        <div className="font-medium flex-grow mb-2">Цена: {product?.price}</div>
        <div className="font-bold">Описание</div>

        <div>{product?.description}</div>
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
