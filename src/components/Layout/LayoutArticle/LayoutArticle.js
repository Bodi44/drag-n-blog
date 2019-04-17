// @flow
import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd/lib/index'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import {
  deleteRowFromLayout,
  removeArticleFromLayout,
  reorderArticleInRow,
  updateLayout
} from '../../../actions'

import { shortenContent } from '../../../helpers/shortenContent'

import '../../../grid.scss'
import './LayoutArticle.scss'
import BEM from '../../../helpers/BEM'

const b = BEM('LayoutArticle')

type LayoutArticleProps = {
  index: number,
  allArticlesInRow: Array<string>,
  allRowParameters: Array<Object>,
  article: Object,
  connectDragPreview: Function,
  connectDragSource: Function,
  connectDropTarget: Function,
  containerWidth: number,
  parameters: Object,
  rowId: string,
  deleteRowFromLayout: number => Object,
  removeArticleFromLayout: Function,
  reorderArticleInRow: Function,
  updateLayout: Object => Object,
  isDragging: boolean,
  resize: boolean,
}

class LayoutArticle extends Component<LayoutArticleProps> {
  state = {
    dragging: false,
    initX: null,
    initialMaxWidth: null,
    size: null
  }

  setArticlesCells = (size, articleId) => {
    const { allArticlesInRow, updateLayout, rowId, parameters } = this.props

    if (allArticlesInRow.length < 3) {
      articleId !== parameters.id ?
        updateLayout(articleId, `${12 - size}`, rowId) :
        updateLayout(articleId, `${size}`, rowId)
    } else if (allArticlesInRow.length === 3) {
      articleId !== parameters.id ?
        updateLayout(articleId, `${Math.round((12 - size) / 2)}`, rowId) :
        updateLayout(articleId, `${size}`, rowId)
    } else if (allArticlesInRow.length > 3) {
      articleId !== parameters.id ?
        updateLayout(articleId, `${Math.round((12 - size) / 3)}`, rowId) :
        updateLayout(articleId, `${size}`, rowId)
    }
  }

  handleMouseDown = e => {
    e.preventDefault()
    if (!this.state.dragging) {
      this.setState(state => ({
        ...state,
        dragging: true,
        initialMaxWidth: this.props.containerWidth / 12 * parseInt(this.props.parameters.col),
        size: this.props.containerWidth / 12 * parseInt(this.props.parameters.col)
      }))
    }

    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseUp = () => {
    if (this.state.dragging)
      this.setState(state => ({
        ...state,
        initX: null,
        dragging: false
      }))

    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)

    this.props.allArticlesInRow.map(articleId =>
      this.setArticlesCells(Math.round(this.state.size / (this.props.containerWidth / 12)), articleId)
    )
  }

  handleMouseMove = e => {
    e.preventDefault()
    if (!this.state.initX) {
      this.setState(state => ({
        ...state,
        initX: e.pageX,
        initialMaxWidth: this.state.size
      }))
    } else {
      const delta = e.pageX - this.state.initX
      const maxWidth = this.state.initialMaxWidth + delta

      this.setState(state => ({
        ...state,
        size: maxWidth
      }))
    }
  }

  render() {
    const { size } = this.state
    const {
      parameters,
      article,
      connectDropTarget,
      connectDragSource,
      removeArticleFromLayout,
      resize,
      allArticlesInRow,
      deleteRowFromLayout,
      rowId,
      updateLayout
    } = this.props

    return connectDropTarget(
      connectDragSource(
        <div className={`grid__cell_${parameters.col} ${b()}`}
             style={this.state.dragging ? { minWidth: `${size}px`, maxWidth: `${size}px` } : {}}>
          <div className={b('content-container')}>
            <h2 className={b('title')}>{article.title}</h2>
            <button
              className={b('remove')}
              onClick={() => {
                removeArticleFromLayout(article.id, parameters.row)
                if (allArticlesInRow.length === 1) deleteRowFromLayout(rowId)

                allArticlesInRow.filter(articleId => articleId !== article.id)
                  .map(articleId => updateLayout(
                    articleId,
                    `${12 / (parameters.length - 1)}`,
                    rowId
                  ))
              }}
            >
              Remove
            </button>
            <p className={b('content')}>
              {shortenContent(article.content, 50)}
            </p>
            <small className={b('author')}>{article.author}</small>
            <time className={b('date')}>{article.date}</time>
          </div>
          {resize ?
            <div className={b('resize')} onMouseDown={e => this.handleMouseDown(e)}>
            </div> : null
          }
        </div>
      )
    )
  }
}

export default flow(
  DragSource(
    'Article',
    {
      beginDrag: props => ({
        id: props.article.id,
        index: props.index,
        col: props.parameters.col,
        row: props.parameters.row
      }),

      endDrag: (props) =>
        props.parameters.id
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    })
  ),
  DropTarget(
    'Article',
    {
      canDrop: () => false,
      hover: (props, monitor) => {
        const dragRow = monitor.getItem().row
        const draggedId = monitor.getItem().id
        const index = monitor.getItem().index
        const overRow = props.parameters.row
        const overId = props.article.id
        const overIndex = props.index

        if (index === overIndex) return
        if (draggedId === overId) return
        if (dragRow !== overRow) return

        if (index !== undefined && overIndex !== undefined)
          props.reorderArticleInRow(props.rowId, index, overIndex, draggedId, overId)

        monitor.getItem().index = overIndex
      }
    },
    connect => ({
      connectDropTarget: connect.dropTarget()
    })
  ),
  connect(
    null,
    {
      reorderArticleInRow,
      updateLayout,
      removeArticleFromLayout,
      deleteRowFromLayout
    }
  )
)(LayoutArticle)
