import { useTranslation } from 'react-i18next'

interface CartFooterProps {
  totalPrice: number | undefined
  deliverPrice: number | undefined
}

export const CartFooter = (props: CartFooterProps) => {
  const { t } = useTranslation()

  const { totalPrice } = props

  return (
    <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200 rounded-t-2xl shadow-strong p-6 mt-6 animate-fade-in">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">{t('allPrice')}:</span>
            <span className="text-lg font-semibold text-gray-800">
              {totalPrice ? Number(totalPrice).toLocaleString() : ''} 
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">{t('itogo')}:</span>
          <div className="text-2xl font-bold text-primary-500">
            {totalPrice ? Number(totalPrice).toLocaleString() : ''} 
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
