import clsx from 'clsx'
import { Category } from '../types/types'

interface CategoryProps {
  categories: Category[] | null
  setCategory_id: (id: number) => void
  category_id: number | null
}

export const Categories = ({
  categories,
  setCategory_id,
  category_id,
}: CategoryProps) => {
  return (
    <>
      <div className="font-bold text-lg mt-5">Выберите категорию</div>

      <div className="overflow-x-auto scroll-m-4 no-scrollbar">
        <div className="inline-flex rounded-md mt-5 gap-5 select-none">
          {categories?.map((category) => (
            <button
              key={category.id}
              type="button"
              className={clsx(
                'rounded-lg border shadow-sm border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900',
                { 'bg-slate-600 text-white': category.id === category_id }
              )}
              onClick={() => setCategory_id(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
