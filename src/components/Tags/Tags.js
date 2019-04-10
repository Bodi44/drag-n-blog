import React from 'react'
import './Tags.scss'
import BEM from '../../helpers/BEM'

const b = BEM('Tags')

const Tags = props => {

  return props.tags ? (
    <label className={props.className}>
      <ul className={b('container')}>
        {props.tags.map((item, tag) =>
          <li key={tag} className={b('item')}>
            {item}
            <span className={b('item_delete')} onClick={props.handleDelete.bind(this, tag)}>
                  <img src="https://res.cloudinary.com/dum2a6djw/image/upload/c_scale,w_12/v1552900349/delete.png"/>
                </span>
          </li>
        )}
        <input
          className={b('input')}
          placeholder={'#add tags'}
          value={props.input}
          onChange={props.handleInputChange}
          onKeyDown={props.handleInputKeyDown}/>
      </ul>
    </label>
  ) : (
    <p/>
  )
}

export default Tags;