// @flow
import React, { useState, useEffect } from 'react'
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

const Sidebar = (props: SidebarProps) => {
  const [dragging, setDragging] = useState(false)
  const [styles, setStyles] = useState({ minWidth: '300px', maxWidth: '300px' })
  const [initX, setInitX] = useState(300)
  const [initialMaxWidth, setInitialMaxWidth] = useState(300)

  useEffect(() => {
    props.fetchArticles()
  }, props.articles.length)

  const updateSize = width => {
    setStyles({ minWidth: width, maxWidth: width })
  }

  const onMouseMove = e => {
    if (dragging === true) {
      if (!initX) {
        setInitialMaxWidth(parseInt(styles.maxWidth.replace('px', '')))
        setInitX(e.pageX)
      } else {
        const delta = e.pageX - initX
        const maxWidth = `${initialMaxWidth + delta}px`
        if (initialMaxWidth + delta < 500 && initialMaxWidth + delta > 200)
          updateSize(maxWidth)
      }
    }
  }

  const removeEventListener = () => {
    if (dragging === true) {
      setDragging(dragging => !dragging)
      setInitX(null)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }

  const addEventListener = e => {
    e.preventDefault()
    if (dragging === false) {
      setDragging(dragging => !dragging)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', removeEventListener)
    }
  }

  const getHoveredColor = (hovered, canDrop) => {
    if (hovered && canDrop) return '#2ecc71'
    else if (hovered && !canDrop) return '#e74c3c'
    else return '#ecf0f1'
  }

  const {
    connectDropTarget,
    hovered,
    canDrop,
    containerId,
    error,
    loading,
    articles,
    removeArticle
  } = props

  const backgroundColor = getHoveredColor(hovered, canDrop)

  if (error) return <div>Error! {error.message}</div>

  if (loading) return <div>Loading...</div>

  return connectDropTarget(
    <aside className={b()} style={{
      background: backgroundColor,
      minWidth: styles.minWidth,
      maxWidth: styles.maxWidth
    }}>
      <ul className={b('blog-list')}>
        {articles.map(article => (
          <Article
            article={article}
            key={article.id}
            containerId={containerId}
            itemDeleter={removeArticle}
          />
        ))}
      </ul>
      {dragging === true ?
        <div className={b('resize-bar', ['active'])} onMouseDown={(e) => addEventListener(e)}>
          control-size
        </div>
        : <div className={b('resize-bar')} onMouseDown={e => addEventListener(e)}>
          control-size
        </div>
      }
    </aside>
  )
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
