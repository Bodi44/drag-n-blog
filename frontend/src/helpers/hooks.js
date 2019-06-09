import { useState } from 'react'

export const useFormInput = initValue => {
  const [value, setValue] = useState(initValue)
  const onChange = ev => setValue(ev.target.value)
  return { value, onChange }
}
