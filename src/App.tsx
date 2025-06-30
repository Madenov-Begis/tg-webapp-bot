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

      // Отключаем возможность закрытия через свайп вниз
      tg.disableClosingConfirmation()

      // Включаем режим вертикальных свайпов (если нужно)
      if (tg.enableClosingConfirmation) {
        tg.enableClosingConfirmation()
      }

      // Устанавливаем цвет заголовка (опционально)
      tg.setHeaderColor('#ffffff')

      // Устанавливаем цвет фона (опционально)
      tg.setBackgroundColor('#ffffff')

      // Показываем приложение как готовое к использованию
      tg.ready()
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
