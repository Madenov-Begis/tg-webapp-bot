import { router } from './shared/routes/router'
import { Container } from './shared/ui/container/container'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return (
    <main className="relative max-w-[600px] mx-auto h-full bg-white">
      <Container>
        <RouterProvider router={router} />
      </Container>
    </main>
  )
}

export default App
