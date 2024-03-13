import { HomePageApi } from '@/features/home-page/api/home-page-api'
import { useProductList } from '@/features/home-page/context/products-list'
import { Category } from '@/features/home-page/types/types'
import { Categories } from '@/features/home-page/ui/categories'
import { PageHead } from '@/features/home-page/ui/page-head'
import { ProductsList } from '@/features/home-page/ui/products-list'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { HTTPError } from '@/shared/types/Errors'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { Input } from '@/shared/ui/input/input'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

const HomePage = () => {
  const { locale } = useParams()
  const { tg, user } = useTelegram()
  const navigate = useNavigate()
  const {t} = useTranslation()

  const {
    isLoading,
    isPageLoading,
    products,
    setCategory_id,
    setKeyWord,
    setPage,
    totalPage,
    category_id,
    page,
  } = useProductList()

  const [categories, setCategories] = useState<Category[] | null>(null)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [basketCount, setBasketCount] = useState(0)
  const [error, setError] = useState('')

  const getBasketCount = async () => {
    try {
      await HomePageApi.basketCount(user.id).then((data) =>
        setBasketCount(data.count)
      )
    } catch (error) {
      const err = error as HTTPError

      setError(err.message)
    }
  }

  const getCategories = async () => {
    try {
      setCategoryLoading(true)
      const res = await HomePageApi.getCategories(user.id)

      setCategories(res)
    } catch (error) {
      const err = error as HTTPError

      setError(err.message)
    } finally {
      setCategoryLoading(false)
    }
  }

  useEffect(() => {
    tg.ready()
    tg.isClosingConfirmationEnabled = true
    tg.BackButton.hide()
    getCategories()
    getBasketCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (basketCount > 0) {
      tg.MainButton.show()
      tg.MainButton.setText(`${t('goToCart')} (${basketCount})`)
      tg.MainButton.onClick(() => navigate(`/${locale}/cart`))
    }
    if (!basketCount) {
      tg.MainButton.hide()
    }

    return () => {
      tg.MainButton.offClick(() => navigate(`/${locale}/cart`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basketCount])

  return (
    <>
      <PageHead locale={locale} basketCount={basketCount} />
      
      <Input
        label={t('search')}
        placeholder={t('search')}
        icon={true}
        type="search"
        setKeyWord={setKeyWord}
      />

      {error && <ErrorAlert errorText={error} />}

      <Categories
        categoryLoading={categoryLoading}
        categories={categories}
        setCategory_id={setCategory_id}
        category_id={category_id}
      />

      <div className="h-[1px] bg-black/20 mt-5"></div>

      <ProductsList
        isLoading={isLoading}
        products={products}
        locale={locale}
        setBasketCount={setBasketCount}
      />

      {page === totalPage ||
        (totalPage > 1 && (
          <div className="text-center mt-5">
            <button
              className="btn bg-[#4f46e5] text-white"
              onClick={() => setPage((prev) => prev + 1)}
            >
              {isPageLoading && (
                <span className="loading loading-spinner"></span>
              )}
              {t('show10')}
            </button>
          </div>
        ))}
    </>
  )
}

export default HomePage
