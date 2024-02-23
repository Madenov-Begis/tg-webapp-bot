import { HomePageApi } from '@/features/home-page/api/home-page-api'
import { useProductList } from '@/features/home-page/context/products-list'
import { Category } from '@/features/home-page/types/types'
import { Categories } from '@/features/home-page/ui/categories'
import { PageHead } from '@/features/home-page/ui/page-head'
import { ProductsList } from '@/features/home-page/ui/products-list'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { Input } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const HomePage = () => {
  const { locale } = useParams()
  const { tg } = useTelegram()

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

  const getCategories = async () => {
    try {
      setCategoryLoading(true)
      const res = await HomePageApi.getCategories()

      setCategories(res)
    } catch (error) {
      console.log(error)
    } finally {
      setCategoryLoading(false)
    }
  }

  // useEffect(() => {
  //   getProductsList()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category_id, keyword])

  useEffect(() => {
    tg.ready()
    getCategories()
  }, [])

  return (
    <>
      <PageHead locale={locale} />

      <Input
        label="Поиск"
        placeholder="Я ищью..."
        icon={true}
        type="search"
        setKeyWord={setKeyWord}
      />
      <Categories
        categoryLoading={categoryLoading}
        categories={categories}
        setCategory_id={setCategory_id}
        category_id={category_id}
      />

      <div className="h-[1px] bg-black/20 mt-5"></div>

      <ProductsList isLoading={isLoading} products={products} locale={locale} />

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
              Показать ещё 10
            </button>
          </div>
        ))}
    </>
  )
}

export default HomePage
