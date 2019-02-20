import React, { Component } from 'react'
import update from 'immutability-helper'

import Container from '../Container/Container'

import './BlogTable.scss'
import '../../../css-grid/grid.scss'

class BlogTable extends Component {
  state = {
    containers: this.props.items,
  }

  addContainer = () => {
    this.setState(update(this.state, {
      containers: {
        $push: [
          []
        ],
      },
    }))
  }

  modifyContainer = (index, items) =>{
    console.log(index, items)
  }

  render() {
    const { containers } = this.state
    return (
      <div className={'grid_9 BlogTable'}>
        {containers.map((container, index) => (
          <Container onDropHandler={this.modifyContainer} id={this.props.id} index={index} container={container}/>
        ))}
        <button onClick={this.addContainer}>Add new Container</button>
      </div>
    )
  }
}

export default BlogTable