import { HomePageApi } from '@/features/home-page/api/home-page-api'
import { useState } from 'react'
import { useProductList } from '@/features/home-page/context/products-list'
import { HTTPError } from '../types/Errors'

export const useAddToCart = () => {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

 
  const { setProducts } = useProductList()

  const addToCArt = async (productId: number | undefined) => {
    try {
      setIsLoading(true)
      await HomePageApi.addToBasket({
        body: {
          count: 1,
          product_id: productId,
        },
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

      const err = error as HTTPError

      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, addToCArt, error, isError }
}
