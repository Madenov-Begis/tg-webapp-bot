import { Input } from "@/shared/ui"

const Order = () => {
  return (
    <>
      <Input
        placeholder="ФИО"
        label="ФИО"
        icon={false}
        type="text"
        setKeyWord={() => {}}
      />
      <Input
        placeholder="Номер телефона"
        label="Номер телефона"
        icon={false}
        type="number"
        setKeyWord={() => {}}
      />
      <Input
        placeholder="Адрес"
        label="Адрес"
        icon={false}
        type="text"
        setKeyWord={() => {}}
      />
    </>
  )
}

export default Order
