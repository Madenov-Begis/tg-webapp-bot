import { ProductProvider } from './features/home-page/context/product-context'
import { router } from './shared/routes/router'
import { Container } from './shared/ui/container/container'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return (
    <main className="relative max-w-[600px] mx-auto h-full bg-white">
      <Container>
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
      </Container>
    </main>
  )
}

export default App
