import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return <div className="mx-auto px-5 py-5">{children}</div>
}
