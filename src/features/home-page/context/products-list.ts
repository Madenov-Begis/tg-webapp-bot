import { useContext } from 'react'
import { ProductContext } from './product-context'

export const useProductList = () => {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error('No users context')
  }

  return context
}
