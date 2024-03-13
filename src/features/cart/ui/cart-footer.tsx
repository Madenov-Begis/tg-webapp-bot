import { useTranslation } from 'react-i18next'

interface CartFooterProps {
  totalPrice: number | undefined
  deliverPrice: number | undefined
}

export const CartFooter = (props: CartFooterProps) => {
  const { t } = useTranslation()

  const { totalPrice, deliverPrice } = props

  return (
    <div className="flex-grow-0 p-3 rounded-t-md shadow-md border text-xl mt-5">
      <div className="flex justify-between items-center">
        <div>{t('allPrice')}:</div>
        <div>{totalPrice?.toLocaleString()} сум</div>
      </div>
      <div className="flex justify-between items-center">
        <div>{t('deliver')}:</div>
        <div>{deliverPrice} сум</div>
      </div>
      <div className="flex justify-between items-center border-t pt-3 mt-3">
        <div className="font-bold text-2xl">{t('itogo')}:</div>
        <div className="font-bold text-2xl">
          {totalPrice?.toLocaleString()} сум
        </div>
      </div>
    </div>
  )
}
