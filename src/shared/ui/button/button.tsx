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
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'disable'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = (props: ButtonProps) => {
  const { title, onClick, className, loading, variant = 'primary', size = 'md' } = props

  const baseClasses = 'font-medium transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white shadow-soft focus:ring-primary-500',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-soft focus:ring-secondary-500',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-soft focus:ring-accent-500',
    outline: 'border-2 border-primary-500 text-primary-600 focus:ring-primary-500',
    disable: 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border-none pointer-events-none',
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-xl'
  }

  return (
    <button
      onClick={onClick}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        'w-full',
        className
      )}
      disabled={loading}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        <span className="animate-fade-in">{title}</span>
      </div>
    </button>
  )
}
