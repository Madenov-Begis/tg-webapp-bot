import { router } from './shared/routes/router'
import { Container } from './shared/ui/container/container'
import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tg = window?.Telegram?.WebApp

    if (tg) {
      // Разворачиваем приложение на всю высоту
      tg.expand()

      // Ставим цвет фона и шапки
      tg.setHeaderColor('#000000')
      tg.setBackgroundColor('#000000')

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
    <main className="relative max-w-[600px] mx-auto min-h-screen">
      <div className="bg-white mt-12 min-h-[calc(100vh-3rem)]">
        <Container>
          <RouterProvider router={router} />
        </Container>
      </div>
    </main>
  )
}

export default App
