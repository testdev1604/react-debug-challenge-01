import { createContext, useContext, useState } from 'react'

const CounterContext = createContext(null)

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)
  const increment = () => setCount((c) => c + 1)

  return (
    <CounterContext.Provider value={{ count, increment }}>
      {children}
    </CounterContext.Provider>
  )
}

export function useCounter() {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider')
  }
  return context
}
