import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  icon: boolean
  type: string
  setKeyWord: (value: string) => void
  error?: boolean
  errorMessage?: string | undefined
}

export const Input = (props: InputProps) => {
  const {
    label,
    placeholder,
    type,
    error,
    setKeyWord,
    errorMessage,
    ...otherProps
  } = props

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-medium">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered input-secondary w-full"
        onChange={(e) => setKeyWord(e.target.value)}
        {...otherProps}
      />
      {error && (
        <div className="label">
          <span className="label-text-alt text-red-500">{errorMessage}</span>
        </div>
      )}
    </label>
  )
}
