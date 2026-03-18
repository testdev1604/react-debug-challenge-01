import { useMemo } from 'react'
import { useCounter } from '../context/CounterContext'

export default function CounterStatus() {
  const { count } = useCounter()

  const statusText = useMemo(
    () =>
      count === 0
        ? 'No clicks yet'
        : `Clicked ${count} time${count !== 1 ? 's' : ''}`,
    [],
  )

  return <p data-testid="counter-status">{statusText}</p>
}
