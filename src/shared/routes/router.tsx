import { createBrowserRouter } from 'react-router-dom'

import HomePage from '@/pages/home-page'
import ProductDetail from '@/pages/product-detail'
import Cart from '@/pages/cart'
import Order from '@/pages/order'
import { ProductProvider } from '@/features/home-page/context/product-context'
import { Suspense, lazy } from 'react'
import Layout from '../layout/layout'

const AdminOrder = lazy(() => import('@/pages/admin-order'))
const MyOrders = lazy(() => import('@/pages/my-orders'))

export const router = createBrowserRouter([
  {
    path: '/lang/:locale',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProductProvider>
            <HomePage />
          </ProductProvider>
        ),
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'order',
        element: <Order />,
      },
      {
        path: 'admin/order/:uuid',
        element: (
          <Suspense
            fallback={
              <div className="w-full h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            }
          >
            <AdminOrder />,
          </Suspense>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <Suspense
            fallback={
              <div className="w-full h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            }
          >
            <MyOrders />,
          </Suspense>
        ),
      },
    ],
  },
])
