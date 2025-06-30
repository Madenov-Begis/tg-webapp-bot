import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './shared/routes/router'
import { Container } from './shared/ui/container/container'

const App = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const tg = window?.Telegram?.WebApp

    if (tg) {
      // Разворачиваем приложение на всю высоту
      tg.expand()

      // Включаем защиту от закрытия
      tg.enableClosingConfirmation?.()
      tg.disableVerticalSwipes?.()

      // Отмечаем, что готово
      tg.ready()

      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        return ''
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [])

  return (
    <main className="max-w-[600px] mx-auto min-h-screen">
      <Container>
        <RouterProvider router={router} />
      </Container>
    </main>
  )
}

export default App
