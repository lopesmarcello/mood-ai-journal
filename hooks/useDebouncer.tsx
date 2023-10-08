import { useCallback, useEffect, useState } from 'react'

export function useDebouncer(debounceTimeInMilisseconds = 300) {
  const [inputValue, setInputValue] = useState('')
  const [lastInputValue, setLastInputValue] = useState<string | null>(null)
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null)

  const handleDebounce = useCallback(() => {
    setTimeout(() => {
      if (inputValue === lastInputValue) {
        setDebouncedValue(inputValue)
      } else {
        setLastInputValue(inputValue)
      }
    }, debounceTimeInMilisseconds)
  }, [inputValue, lastInputValue, debounceTimeInMilisseconds])

  useEffect(() => {
    if (inputValue) {
      handleDebounce()
    }
  }, [inputValue, handleDebounce])

  return {
    setInputValue,
    debouncedValue,
  }
}
