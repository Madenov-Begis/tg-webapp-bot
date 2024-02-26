import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  icon: boolean
  type: string
  error?: boolean
  errorMessage?: string | undefined
}

export const InputRef = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label, placeholder, type, error, errorMessage, ...otherProps } =
      props

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
)

InputRef.displayName = 'Input'
