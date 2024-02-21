import { HomePageApi } from '@/features/home-page/api/home-page-api'
import { Category, Product } from '@/features/home-page/types/types'
import { Categories } from '@/features/home-page/ui/categories'
import { PageHead } from '@/features/home-page/ui/page-head'
import { ProductsList } from '@/features/home-page/ui/products-list'
// import { useTelegram } from '@/shared/hooks/useTelegram'
import { Input } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'

const HomePage = () => {
  const { locale } = useParams()

  // const { tg, user, queryId } = useTelegram()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[] | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)

  const [totalPage, setTotalPage] = useState(1)

  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyWord] = useDebounceValue<string>('', 500)
  const [category_id, setCategory_id] = useState<number | null>(null)

  const handleAddCart = () => {
    console.log(setPage(1))
  }

  useEffect(() => {
    const GetProducts = async () => {
      try {
        setIsPageLoading(true)
        await HomePageApi.getProducts({ category_id, keyword, page }).then(
          (data) => {
            setProducts((prev) => [...prev, ...data.data])
            setTotalPage(data.last_page)
          }
        )
      } catch (error) {
        console.log(error)
      } finally {
        setIsPageLoading(false)
      }
    }
    if (!(page === 1)) {
      GetProducts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    const GetProducts = async () => {
      try {
        setIsLoading(true)
        await HomePageApi.getProducts({ category_id, keyword, page: 1 }).then(
          (data) => {
            setProducts(data.data)
            setTotalPage(data.last_page)
          }
        )
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    GetProducts()
  }, [keyword, category_id])

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

      <ProductsList
        isLoading={isLoading}
        products={products}
        locale={locale}
        handleAddCart={handleAddCart}
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
              Показать ещё 10
            </button>
          </div>
        ))}
    </>
  )
}

export default HomePage
