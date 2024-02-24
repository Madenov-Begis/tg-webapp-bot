import clsx from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick: () => void
  className?: string
  loading: boolean
}
export const IconButton = (props: ButtonProps) => {
  const { children, loading, onClick, className } = props

  return (
    <button className={clsx('btn btn-circle btn-sm', className)} onClick={onClick}>
      {loading && <span className="loading loading-spinner"></span>}
      {!loading && children}
    </button>
  )
}
