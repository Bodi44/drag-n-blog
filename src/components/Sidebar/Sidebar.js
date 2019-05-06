// @flow
import React, { Component } from 'react'
import { DropTarget } from 'react-dnd/lib/index'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import {
  getAllArticles,
  isAllArticlesLoading,
  isAllArticlesLoadingError,
  getIdsInLayout,
  getAllRows,
  getLayoutParameters
} from '../../reducers'
import {
  deleteRowFromLayout,
  fetchArticles, fetchLayout, fetchRows,
  removeArticle,
  removeArticleFromLayout,
  updateArticle, updateLayout
} from '../../actions'
import Article from './Article'

import { updateLocalStorage } from '../../helpers/manageLocalStorage'

import './Sidebar.scss'
import BEM from '../../helpers/BEM'
import Toolbar from '../Toolbar'

const b = BEM('Sidebar')

type SidebarProps = {
  addNewToArticles: Object => Object,
  articles: Array<Object>,
  canDrop: boolean,
  connectDropTarget: Function,
  error: null | Object,
  fetchContent: () => Object | Promise<Object>,
  hovered: boolean,
  loading: boolean,
  removeArticle: number => Object,
  removeArticleFromLayout: Function,
  updateArticle: Function,
  updateLayout: Object => Object,
  deleteRowFromLayout: number => Object,
  layoutRows: Array<Object>,
  layoutParameters: Array<Object>
}

class Sidebar extends Component<SidebarProps> {
  state = {
    dragging: false,
    style: (localStorage.getItem('sidebarStyles')) ?
      JSON.parse(localStorage.getItem('sidebarStyles'))
      : {
        minWidth: '300px',
        maxWidth: '300px'
      },
    initX: null,
    initialMaxWidth: 300
  }

  componentDidMount() {
    this.props.fetchArticles()
    this.props.fetchLayout()
    this.props.fetchRows()
  }

  updateSize = width => {
    updateLocalStorage({
      minWidth: width,
      maxWidth: width
    }, 'sidebarStyles')

    this.setState(Object.assign({}, this.state, {
      style: JSON.parse(localStorage.getItem('sidebarStyles'))
    }))

  }

  handleMouseDown = e => {
    e.preventDefault()
    if (!this.state.dragging)
      this.setState({ dragging: true })

    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseUp = () => {
    if (this.state.dragging)
      this.setState({ dragging: false, initX: null })

    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove = e => {
    e.preventDefault()

    if (!this.state.initX) {
      const initialMaxWidth = parseInt(this.state.style.maxWidth.replace('px', ''))
      this.setState(state => ({
        ...state,
        initX: e.pageX,
        initialMaxWidth: initialMaxWidth
      }))

    } else {
      const delta = e.pageX - this.state.initX
      const maxWidth = `${this.state.initialMaxWidth + delta}px`
      if (this.state.initialMaxWidth + delta < 500 && this.state.initialMaxWidth + delta > 200)
        this.updateSize(maxWidth)
    }
  }

  render() {
    const {
      connectDropTarget,
      hovered,
      error,
      loading,
      articles,
      removeArticle
    } = this.props

    const { dragging } = this.state

    if (error) return <div>Error! {error.message}</div>

    if (loading) return <div>Loading...</div>

    return connectDropTarget(
      <aside className={b()} style={{
        background: hovered ? '#81ecec' : '#ecf0f1',
        minWidth: this.state.style.minWidth,
        maxWidth: this.state.style.maxWidth
      }}>
        <ul className={b('blog-list')}>
          {articles.map(article => (
            <Article
              article={article}
              key={article.id}
              itemDeleter={removeArticle}
            />
          ))}
        </ul>
        {dragging ?
          <div className={b('resize-bar', ['active'])} onMouseDown={e => this.handleMouseDown(e)}>
            control-size
          </div>
          : <div className={b('resize-bar')} onMouseDown={e => this.handleMouseDown(e)}>
            control-size
          </div>
        }
      </aside>
    )
  }
}

export default flow(
  DropTarget(
    'Article',
    {
      drop: (props, monitor) => {
        const result = props.articles.filter(article => article.id === monitor.getItem().id)

        if (result.length === 0) {
          props.removeArticleFromLayout(monitor.getItem().id, monitor.getItem().row)
          props.layoutParameters.filter(param => param.row === monitor.getItem().row && param.id !== monitor.getItem().id)
            .map(param => props.updateLayout(
              param.id,
              `${12 / (props.layoutParameters.length - 1)}`,
              param.row
            ))

          if (props.layoutRows.filter(row => row.id === monitor.getItem().row)[0].articlesInRow.length === 1)
            props.deleteRowFromLayout(monitor.getItem().row)
        }
      }
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      hovered: monitor.isOver()
    })
  ),
  connect(
    state => ({
      articles: getAllArticles(state).filter(article => getIdsInLayout(state).indexOf(article.id) === -1),
      loading: isAllArticlesLoading(state),
      error: isAllArticlesLoadingError(state),
      layoutRows: getAllRows(state),
      layoutParameters: getLayoutParameters(state)
    }),
    {
      fetchArticles,
      removeArticle,
      updateArticle,
      removeArticleFromLayout,
      deleteRowFromLayout,
      updateLayout,
      fetchRows,
      fetchLayout
    }
  )
)(Sidebar)
