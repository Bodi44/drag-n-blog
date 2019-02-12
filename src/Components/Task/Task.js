import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import '../css-grid/grid.scss'
import './Task.scss'


export default class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <li
            className={snapshot.isDragging ? 'Task Task_moving' : 'Task'}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <header className={'Task__top-content'}>
              <h5 className='Task__title'>{this.props.task.title}</h5>
              <button className={'Task__remove'}>Remove</button>
            </header>
            <p className={'Task__content'}>{this.props.task.content}</p>
            <footer className={'Task__secondary'}>
              <small className={'Task__author'}>{this.props.task.author}</small>
              <time className={'Task__post-time'}>{this.props.task.time}</time>
            </footer>
          </li>
        )
        }
      </Draggable>
    )
  }
}
