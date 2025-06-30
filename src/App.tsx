import { router } from './shared/routes/router'
import { Container } from './shared/ui/container/container'
import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const tg = window.Telegram?.WebApp

    if (tg) {
      // Расширяем приложение до полной высоты
      tg.expand()

      // Включаем полноэкранный режим (если доступен)
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

      // Устанавливаем цвет заголовка
      tg.setHeaderColor('#000000')

      // Устанавливаем цвет фона
      tg.setBackgroundColor('#000000')

      // Показываем приложение как готовое к использованию
      tg.ready()

      // Дополнительная защита от случайного закрытия
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        return ''
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      // Очистка при размонтировании
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-black">
      <div className="bg-white mt-12 min-h-[calc(100vh-3rem)]">
        <Container>
          <RouterProvider router={router} />
        </Container>
      </div>
    </main>
  )
}

export default App
