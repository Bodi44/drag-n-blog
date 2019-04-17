//@flow
import React from 'react'

import './Tags.scss'
import BEM from '../../helpers/BEM'

const b = BEM('Tags')

type TagsProps = {
  className: string,
  handleDelete: Function,
  handleInputChange: Function,
  handleInputKeyDown: Function,
  input: string,
  tags: ?Array<string>
}

const Tags = ({ className, handleDelete, handleInputChange, handleInputKeyDown, input, tags }: TagsProps) =>
  tags ? (
    <label className={className}>
      <ul className={b('container')}>
        {tags.map((item, tag) =>
          <li key={tag} className={b('item')}>
            {item}
            <span className={b('item_delete')} onClick={handleDelete.bind(this, tag)}>
                  <img src="https://res.cloudinary.com/dum2a6djw/image/upload/c_scale,w_12/v1552900349/delete.png"
                       alt="delete tag"/>
            </span>
          </li>
        )}
        <input
          className={b('input')}
          placeholder={'#add tags'}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}/>
      </ul>
    </label>
  ) : (
    <p/>
  )

export default Tags