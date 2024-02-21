import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  icon: boolean
  type: string
  setKeyWord: (value: string) => void
}

export const Input = ({ label, placeholder, type, setKeyWord }: InputProps) => {
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
      />
    </label>
  )
}
