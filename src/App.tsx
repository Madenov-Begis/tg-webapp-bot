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

      if (tg.requestFullscreen) {
        tg.requestFullscreen()
      }

      // ВАЖНО: Отключаем закрытие через свайп/скролл
      tg.disableClosingConfirmation()

      // Включаем подтверждение закрытия - теперь закроется только через кнопку
      tg.enableClosingConfirmation()

      // Отключаем возможность закрытия свайпом вниз
      if (tg.isClosingConfirmationEnabled !== undefined) {
        tg.enableClosingConfirmation()
      }

      // Блокируем вертикальные свайпы для закрытия
      if (tg.disableVerticalSwipes) {
        tg.disableVerticalSwipes()
      }

      // Ставим цвет фона и шапки
      tg.setHeaderColor('#000000')
      tg.setBackgroundColor('#000000')

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
    <main className="max-w-[600px] mx-auto min-h-screen pt-12">
      <Container>
        <RouterProvider router={router} />
      </Container>
    </main>
  )
}

export default App
