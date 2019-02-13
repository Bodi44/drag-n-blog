import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Task from '../Task/Task'

import '../../css-grid/grid.scss'
import './Column.scss'

export default class Column extends Component {
  render() {
    return (
      <div className='grid_12 Column'>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <ul
              className={'grid_12 Column__tasks'}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} columnId={this.props.column.id} task={task} index={index}
                      handler={this.props.handler}/>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <button className={'grid_12 Column__add-task'}>Add new</button>
      </div>
    )
  }
}
