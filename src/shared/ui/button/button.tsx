import clsx from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string
  onClick: () => void
  className?: string
  loading?: boolean
}

export const Button = (props: ButtonProps) => {
  const { title, onClick, className, loading } = props

  return (
    <button
      onClick={onClick}
      className={clsx('btn w-full hover:bg-', className)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      disabled={loading && 'disabled'}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {title}
    </button>
  )
}
