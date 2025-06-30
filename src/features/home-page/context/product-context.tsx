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
import { useParams } from 'react-router-dom'

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
  const { locale } = useParams()

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyWord] = useDebounceValue<string>('', 500)
  const [category_id, setCategory_id] = useState<number | null>(null)

  useEffect(() => {
    const GetProducts = async () => {
      try {
        if (page === 1) setIsLoading(true)
        else setIsPageLoading(true)
        const data = await HomePageApi.getProducts({
          params: { category_id, keyword, page },
          locale,
        });
        if (page === 1) {
          setProducts(data.data.data)
        } else {
          setProducts((prev) => [...prev, ...data.data.data])
        }
        setTotalPage(data.data.last_page)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
        setIsPageLoading(false)
      }
    }
    GetProducts()
  }, [keyword, category_id, page, locale])

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
