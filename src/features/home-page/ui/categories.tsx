import clsx from 'clsx'
import { Category } from '../types/types'
import { useTranslation } from 'react-i18next'

interface CategoryProps {
  categoryLoading: boolean
  categories: Category[] | null
  setCategory_id: (id: number) => void
  category_id: number | null
}

export const Categories = ({
  categoryLoading,
  categories,
  setCategory_id,
  category_id,
}: CategoryProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="font-bold text-lg mt-5">{t('chooseCategory')}</div>

      <div className="overflow-x-auto scroll-m-4 no-scrollbar">
        <div className="inline-flex rounded-md mt-5 gap-5 select-none">
          {categoryLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={item}
                className="skeleton w-[100px] h-[38px] rounded-md"
              ></div>
            ))}
          {!categoryLoading &&
            categories?.map((category) => (
              <button
                key={category.id}
                type="button"
                className={clsx(
                  'rounded-lg border shadow-sm border-gray-200 text-sm font-medium px-4 py-2 text-gray-900',
                  { 'bg-primary-500 text-white': category.id === category_id }
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
