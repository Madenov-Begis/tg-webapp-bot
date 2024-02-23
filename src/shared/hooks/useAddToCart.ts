import { HomePageApi } from '@/features/home-page/api/home-page-api'
import { useState } from 'react'
import { useTelegram } from './useTelegram'
import { Error } from '../types/Errors'
import { useProductList } from '@/features/home-page/context/products-list'

export const useAddToCart = () => {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useTelegram()
  const { setProducts } = useProductList()

  const addToCArt = async (productId: number | undefined) => {
    try {
      setIsLoading(true)
      await HomePageApi.addToBasket({
        count: 1,
        product_id: productId,
        customer_id: user?.id || 1,
      })

      setProducts((prev) => {
        return prev.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              basket_count: 1,
            }
          }
          return product
        })
      })
    } catch (error) {
      setIsError(true)

      const err = error as Error

      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, addToCArt, error, isError }
}
