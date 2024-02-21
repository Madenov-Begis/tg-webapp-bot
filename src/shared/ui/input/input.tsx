import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  icon: boolean
  type: string
  setKeyWord: (value: string) => void
}

export const Input = ({
  label,
  placeholder,
  icon,
  type,
  setKeyWord,
}: InputProps) => {
  return (
    <label className="block text-md font-medium text-gray-700 mb-5">
      {label}
      <div className="relative">
        {icon && (
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        )}
        <input
          type={type}
          className={clsx(
            'outline-none block p-3 w-full text-sm bg-[#F5F6FA] text-gray-900 shadow-sm rounded-lg border border-gray-300 focus:ring-blue-700 focus:border-blue-700',
            { 'pl-10': icon }
          )}
          placeholder={placeholder}
          required
          onChange={(e) => setKeyWord(e.target.value)}
        />
      </div>
    </label>
  )
}
