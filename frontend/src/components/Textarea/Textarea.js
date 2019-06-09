//@flow
import React, { useEffect, useRef } from 'react'
import autosize from 'autosize'

type TextareaProps = {
  classname: string,
  name: string,
  onChange: Function,
  placeholder: string,
  value: ?string
}

const Textarea = (props: TextareaProps) => {
  const textarea = useRef(null)

  useEffect(() => {
    autosize(textarea.current)
  })

  return (
    <textarea
      ref={textarea}
      {...props}
    />
  )
}

export default Textarea