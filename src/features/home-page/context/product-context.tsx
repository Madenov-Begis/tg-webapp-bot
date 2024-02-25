import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'
import { Product } from '../types/types'
import { DebouncedState, useDebounceValue } from 'usehooks-ts'
import { HomePageApi } from '../api/home-page-api'
import { useTelegram } from '@/shared/hooks/useTelegram'

interface ProductContextProps {
  products: Product[]
  isLoading: boolean
  isPageLoading: boolean
  totalPage: number
  setPage: Dispatch<SetStateAction<number>>
  setKeyWord: DebouncedState<(value: string) => void>
  setCategory_id: Dispatch<SetStateAction<number | null>>
  category_id: number | null
  page: number
  setProducts: Dispatch<SetStateAction<Product[]>>
}

export const ProductContext = createContext<ProductContextProps | null>(null)

interface ProductProviderProps {
  children: ReactNode
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const { user } = useTelegram()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyWord] = useDebounceValue<string>('', 500)
  const [category_id, setCategory_id] = useState<number | null>(0)

  useEffect(() => {
    const GetProducts = async () => {
      try {
        setIsPageLoading(true)
        await HomePageApi.getProducts({
          params: { category_id, keyword, page },
          user_id: user.id,
        }).then((data) => {
          setProducts((prev) => [...prev, ...data.data])
          setTotalPage(data.last_page)
        })
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
        await HomePageApi.getProducts({
          params: { category_id, keyword, page },
          user_id: user.id,
        }).then((data) => {
          setProducts(data.data)
          setTotalPage(data.last_page)
        })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    GetProducts()
  }, [keyword, category_id])

  return (
    <ProductContext.Provider
      value={{
        page,
        products,
        isLoading,
        isPageLoading,
        totalPage,
        setPage,
        setKeyWord,
        setCategory_id,
        category_id,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
