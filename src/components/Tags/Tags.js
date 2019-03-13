import React from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import './Tags.scss'

const COMMA_KYE_CODE = 188
const ENTER_KEY_CODE = 13

const Tags = props => (
  <ReactTags
    placeholder={'#add tags'}
    delimiters={[COMMA_KYE_CODE, ENTER_KEY_CODE]}
    allowDragDrop={false}
    {...props}
  />
)

export default Tags