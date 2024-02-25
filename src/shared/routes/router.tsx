import { Outlet, createBrowserRouter } from 'react-router-dom'

import HomePage from '@/pages/home-page'
import ProductDetail from '@/pages/product-detail'
import Cart from '@/pages/cart'
import Order from '@/pages/order'
import { ProductProvider } from '@/features/home-page/context/product-context'

export const router = createBrowserRouter([
  {
    path: '/:locale',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: (
          <ProductProvider>
            <HomePage />,
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
    ],
  },
])
