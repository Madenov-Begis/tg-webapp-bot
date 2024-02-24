import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  icon: boolean
  type: string
  setKeyWord?: (value: string) => void
  error?: boolean
  errorMessage?: string | undefined
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, placeholder, type, error, errorMessage, ...otherProps } = props

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-medium">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered input-secondary w-full"
        ref={ref}
        // onChange={(e) => setKeyWord(e.target.value)}
        {...otherProps}
      />
      {error && (
        <div className="label">
          <span className="label-text-alt text-red-500">{errorMessage}</span>
        </div>
      )}
    </label>
  )
})

Input.displayName = 'Input'
