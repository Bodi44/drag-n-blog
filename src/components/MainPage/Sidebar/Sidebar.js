// @flow
import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import {
  getAllArticles,
  isAllArticlesLoading,
  isAllArticlesLoadingError
} from '../../../reducers'
import { addArticle, fetchArticles, removeArticle } from '../../../actions'
import Article from './Article'

import { updateLocalStorage } from '../../../helpers/manageLocalStorage'

import './Sidebar.scss'
import BEM from '../../../helpers/BEM'

const b = BEM('Sidebar')

type SidebarProps = {
  addNewToArticles: Object => Object,
  articles: Array<Object>,
  canDrop: boolean,
  connectDropTarget: Function,
  containerId: number,
  error: null | Object,
  fetchContent: () => Object | Promise<Object>,
  hovered: boolean,
  item?: null | Object,
  loading: boolean,
  removeArticle: number => Object,
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
    initX: 300,
    initialMaxWidth: 300
  }

  componentDidMount() {
    this.props.fetchArticles()
  }

  getHoveredColor = (hovered, canDrop) => {
    if (hovered && canDrop) return '#2ecc71'
    else if (hovered && !canDrop) return '#e74c3c'
    else return '#ecf0f1'
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

  addEventListener = e => {
    e.preventDefault()
    if (!this.state.dragging) {
      this.setState({ dragging: true })
      window.addEventListener('mouseup', this.removeEventListener)
      window.addEventListener('mousemove', this.onMouseMove)
    }
  }

  removeEventListener = () => {
    if (this.state.dragging) {
      this.setState({ dragging: false, initX: null })
      window.removeEventListener('mousemove', this.onMouseMove)
    }
  }

  onMouseMove = e => {
    if (this.state.dragging) {
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
  }

  render() {
    const {
      connectDropTarget,
      hovered,
      canDrop,
      containerId,
      error,
      loading,
      articles,
      removeFromArticles
    } = this.props

    const { dragging } = this.state

    const backgroundColor = this.getHoveredColor(hovered, canDrop)

    if (error) return <div>Error! {error.message}</div>

    if (loading) return <div>Loading...</div>

    return connectDropTarget(
      <aside className={b()} style={{
        background: backgroundColor,
        minWidth: this.state.style.minWidth,
        maxWidth: this.state.style.maxWidth
      }}>
        <ul className={b('blog-list')}>
          {articles.map(article => (
            <Article
              article={article}
              key={article.id}
              containerId={containerId}
              itemDeleter={removeFromArticles}
            />
          ))}
        </ul>
        {dragging ?
          <div className={b('resize-bar', ['active'])} onMouseDown={e => this.addEventListener(e)}>
            control-size
          </div>
          : <div className={b('resize-bar')} onMouseDown={e => this.addEventListener(e)}>
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
      drop(props, monitor) {
        const { containerId } = props
        const result = props.articles.filter(
          item => item.id === monitor.getItem().id
        )

        if (result.length === 0) props.addArticle(monitor.getItem())

        return { containerId }
      },

      canDrop(props, monitor) {
        return monitor.getItem().content !== ''
      }
    },
    (connect, monitor) => (
      {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem(),
        canDrop: monitor.canDrop()
      }
    )
  ),
  connect(
    state => ({
      articles: getAllArticles(state),
      loading: isAllArticlesLoading(state),
      error: isAllArticlesLoadingError(state)
    }),
    {
      addArticle,
      fetchArticles,
      removeArticle
    }
  )
)(Sidebar)
