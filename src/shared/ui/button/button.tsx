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
}

export const Button = (props: ButtonProps) => {
  const { title, onClick, className } = props

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full transition-all inline-block rounded-md border border-indigo-600 bg-indigo-600 px-8 py-5 text-sm font-medium text-white active:translate-y-[2px]',
        className
      )}
    >
      {title}
    </button>
  )
}
