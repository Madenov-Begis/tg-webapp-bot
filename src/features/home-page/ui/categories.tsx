const categories = [
  { id: 1, name: 'Все' },
  { id: 2, name: 'Косметика' },
  { id: 3, name: 'БАД' },
  { id: 4, name: 'Одежды' },
  { id: 5, name: 'Кремы' },
  { id: 6, name: 'Лаки' },
  { id: 7, name: 'Бытовые' },
]

export const Categories = () => {
  return (
    <>
      <div className="font-bold text-lg mt-5">Выберите категорию</div>

      <div className="overflow-x-auto scroll-m-4 no-scrollbar">
        <div className="inline-flex rounded-md mt-5 gap-5 select-none">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="rounded-lg border shadow-sm border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
