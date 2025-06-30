import { router } from './shared/routes/router'
import { Container } from './shared/ui/container/container'
import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    if (window.Telegram?.WebApp?.expand) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      window.Telegram.WebApp.expand()
    }
  }, [])

  return (
    <main className="relative max-w-[600px] mx-auto h-full bg-white">
      <Container>
        <RouterProvider router={router} />
      </Container>
    </main>
  )
}

export default App
