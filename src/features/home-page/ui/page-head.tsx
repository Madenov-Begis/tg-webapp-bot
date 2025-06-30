import { useTelegram } from '@/shared/hooks/useTelegram'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface SelectedProductsProps {
  locale: string | undefined
  basketCount: number | null
}

export const PageHead = ({ locale, basketCount }: SelectedProductsProps) => {
  const { t } = useTranslation()
  const { user } = useTelegram()

  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-start">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="logo" className="w-8" />
          <div className="text-xl font-bold">
            TOMARIS APA{' '}
            <span className="text-[16px] opacity-60">SIBERIAN WELLNESS</span>
          </div>
        </div>
        <div
          className="flex bg-[#F5F6FA] p-2 rounded-full cursor-pointer relative border border-[#00000033]"
          onClick={() => navigate(`/${locale}/cart`)}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.7982 22.3958H16.4939C19.6879 22.3958 22.1383 21.2421 21.4424 16.5988L20.6319 10.3058C20.2028 7.98886 18.725 7.10213 17.4282 7.10213H6.82566C5.50986 7.10213 4.1178 8.05561 3.62199 10.3058L2.81154 16.5988C2.2204 20.7177 4.60407 22.3958 7.7982 22.3958Z"
              stroke="#1D1E20"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.65527 6.87332C7.65527 4.38783 9.67016 2.37294 12.1556 2.37294C13.3525 2.36787 14.5021 2.83977 15.3502 3.68431C16.1983 4.52885 16.6751 5.67644 16.6751 6.87332"
              stroke="#1D1E20"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.06641 11.5644H9.11408"
              stroke="#1D1E20"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.1399 11.5644H15.1876"
              stroke="#1D1E20"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {basketCount ? (
            <div className="badge badge-lg absolute top-0 right-0 translate-x-2 -translate-y-2 bg-primary-500 text-white">
              {basketCount}
            </div>
          ) : null}
        </div>
      </div>

      <div className="text-lg font-semibold text-black/40 mt-3 mb-1">
        {t('welcome')} {user?.username}
      </div>
    </div>
  )
}
