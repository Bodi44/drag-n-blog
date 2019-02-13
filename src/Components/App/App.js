import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Header from '../Header/Header'
import Column from '../Column/Column'

import initialData from '../../helpers/initialData'

import './App.scss'
import '../../css-grid/grid.scss'

export default class App extends Component {
  state = {
    ...initialData,
    articles: [],
  }

  componentDidMount() {
    let url = 'http://localhost:3001/articles'
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ articles: data })
      })
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const columns = this.state.columns[source.droppableId]
    const newTaskIds = Array.from(columns.taskIds)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)

    const newColumn = {
      ...columns,
      taskIds: newTaskIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    }

    this.setState(newState)
  }

  handleRemoveTask = (id, columnId) => {
    const newTasks = Object.assign({}, this.state.tasks)
    const newColumns = Object.assign({}, this.state.columns)

    delete newTasks[id]
    newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(taskId => taskId !== id)

    this.setState({
      ...this.state,
      columns: newColumns,
      tasks: newTasks,
    })
  }

  render() {
    return (
      <div className={'container_12 Blog-post'}>
        <Header className={'Blog-post__header'}/>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId]
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks} handler={this.handleRemoveTask}/>
          })}
        </DragDropContext>
      </div>
    )
  }
}