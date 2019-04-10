import React, { useEffect, useRef } from "react";
import autosize from "autosize";

const Textarea = props => {

  const textarea = useRef()

  useEffect(() => {
    autosize(textarea.current);
  })


  return (
    <textarea
      ref={textarea}
      {...props}
    />
  )
}

export default Textarea