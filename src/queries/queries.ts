import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ResponseWithPagination } from '@/shared/types/Response'
import { HTTPError } from '@/shared/types/Errors'
import { HomePageApi } from '../features/home-page/api/home-page-api'
import { Category, Product } from '../features/home-page/types/types'
import { CartApi } from '../features/cart/api/cart-api'
import { Cart } from '../features/cart/types/cart-types'
import { ProductDetailApi } from '@/features/product-detail/api/product-detail-api'
import { OrderApi } from '@/features/order/api/order-api'

export const useFetchProducts = (params: {
  page: number
  keyword: string
  category_id: number | null
}) => {
  return useQuery<ResponseWithPagination<Product[]>, HTTPError>({
    queryKey: ['products'],
    queryFn: () => HomePageApi.getProducts(params),
  })
}

export const useFetchProduct = (productId: string | undefined) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => ProductDetailApi.getProductDetail(productId),
  })
}

export const useFetchCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: HomePageApi.getCategories,
  })
}

export const useFetchCartItems = () => {
  return useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: CartApi.getAll,
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: HomePageApi.addToBasket,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })
}

export const useDekleteCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: CartApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })
}

export const useChangeCount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: CartApi.changeCount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })
}

export const useOrderCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: OrderApi.orderCreate,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['cart', 'products'] }),
  })
}

export const useFetchOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: OrderApi.getAll,
  })
}
