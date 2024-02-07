import { useEffect, useState } from 'react'

const App = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return <div className="flex flex-shrink bg-red-600 text-x">{windowSize}</div>
}

export default App
