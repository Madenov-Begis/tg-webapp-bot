import { HomePageApi } from '@/features/home-page/api/home-page-api'
import { Category, Product } from '@/features/home-page/types/types'
import { Categories } from '@/features/home-page/ui/categories'
import { PageHead } from '@/features/home-page/ui/page-head'
// import { useTelegram } from '@/shared/hooks/useTelegram'
import { ProductCard } from '@/shared/ui'
import { Input } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'

const HomePage = () => {
  const { locale } = useParams()

  // const { tg, user, queryId } = useTelegram()

  const [products, setProducts] = useState<Product[] | null>(null)
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyWord] = useDebounceValue<string>('', 500)
  const [category_id, setCategory_id] = useState<number | null>(null)

  const handleAddCart = () => {
    console.log(setPage(1))
  }

  const getProductsList = async () => {
    try {
      setIsLoading(true)
      const res = await HomePageApi.getProducts({
        page,
        keyword,
        category_id,
      })

      setProducts(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCategories = async () => {
    try {
      const res = await HomePageApi.getCategories()

      setCategories(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category_id, keyword])

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
        categories={categories}
        setCategory_id={setCategory_id}
        category_id={category_id}
      />

      <div className="h-[1px] bg-black/20 mt-5"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {isLoading && <div className="skeleton w-32 h-32"></div>}

        {products?.length &&
          products?.map((product) => (
            <ProductCard
              locale={locale}
              product={product}
              onClick={handleAddCart}
              key={product.id}
            />
          ))}
      </div>
    </>
  )
}

export default HomePage
