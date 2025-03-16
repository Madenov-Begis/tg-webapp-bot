import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router-dom'

const Layout = () => {
  const { i18n } = useTranslation()
  const { locale } = useParams()

  useEffect(() => {
    if (locale) {
      localStorage.setItem('locale', locale)
      i18n.changeLanguage(locale)
    }
  }, [i18n, locale])

  return (
    <>
      <Outlet />
    </>
  )
}

export default Layout
