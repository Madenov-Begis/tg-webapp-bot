import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './shared/routes/router'
import { Container } from './shared/ui/container/container'

const App = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const tg = window?.Telegram?.WebApp

    // Проверяем, что это мобильное устройство
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768

    if (tg && isMobile) {
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
      tg.setHeaderColor('#ffffff')

      // Устанавливаем цвет фона
      tg.setBackgroundColor('#17212B')

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
    } else if (tg) {
      // Для десктопа - только базовая инициализация без полноэкранного режима
      tg.ready()
    }
  }, [])

  return (
    <main className="max-w-[600px] mx-auto min-h-screen">
      <div className="pt-20 bg-[#17212B]"></div>    
      <Container>
        <RouterProvider router={router} />
      </Container>
    </main>
  )
}

export default App
