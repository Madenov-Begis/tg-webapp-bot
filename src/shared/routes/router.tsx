import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/home-page'
import ProductDetail from '@/pages/product-detail'
import Cart from '@/pages/cart'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [],
  },
  {
    path: '/product',
    element: <ProductDetail />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
])