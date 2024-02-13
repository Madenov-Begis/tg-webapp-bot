import { Product } from '@/features/home-page/types/types'
import { Categories } from '@/features/home-page/ui/categories'
import { PageHead } from '@/features/home-page/ui/page-head'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { ProductCard } from '@/shared/ui'
import { Input } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  const { tg } = useTelegram()
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const handleAddCart = (product: Product) => {
    setSelectedProducts((prev) => [...prev, product])
  }

  useEffect(() => {
    tg.ready()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts])

  useEffect(() => {
    if (selectedProducts.length) {
      tg.MainButton.show()
      tg.MainButton.setText(`Перейти в корзину (${selectedProducts.length})`)
      tg.MainButton.onClick(() => navigate('/cart'))
    }

    // const json = JSON.stringify(selectedProducts)

    // localStorage.setItem('cart', json)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts.length])

  return (
    <>
      <PageHead selectedProducts={selectedProducts} />

      <Input label="Поиск" placeholder="Я ищью..." icon={true} type="search" />
      {/* <div onClick={onToggleButton}>open button</div> */}
      <Categories />

      <div className="h-[1px] bg-black/20 mt-5"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {products.map((product) => (
          <ProductCard
            product={product}
            onClick={handleAddCart}
            key={product.id}
          />
        ))}
      </div>

      {/* <Button className='absolute bottom-0 w-full' title='Перейти к корзину' onClick={() => {}}/> */}
    </>
  )
}

const products = [
  {
    id: 1,
    name: 'Крем для ног',
    category: 'Косметика',
    price: 200.0,
    count: 1,
  },
  {
    id: 2,
    name: 'Крем для лица',
    category: 'Косметика',
    price: 200.0,
    count: 1,
  },
  {
    id: 3,
    name: 'Крем для тело',
    category: 'Косметика',
    price: 200.0,
    count: 1,
  },
  {
    id: 4,
    name: 'Крем для глаз',
    category: 'Косметика',
    price: 200.0,
    count: 1,
  },
  {
    id: 5,
    name: 'Крем для кожи',
    category: 'Косметика',
    price: 200.0,
    count: 1,
  },
  {
    id: 6,
    name: 'Крем для ногтей',
    category: 'Косметика',
    price: 200.0,
    count: 1,
  },
]

export default HomePage
