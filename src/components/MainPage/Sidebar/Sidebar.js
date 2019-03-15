// @flow
import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { addArticle, fetchArticles, removeArticle } from '../../../actions'
import Article from './Article'

import './Sidebar.scss'
import {
  getAllArticles,
  isAllArticlesLoading,
  isAllArticlesLoadingError
} from '../../../reducers'

const itemTarget = {
  drop(props, monitor, component) {
    const { containerId } = props
    const result = props.articles.filter(
      item => item.id === monitor.getItem().id
    )

    if (result.length === 0) component.addItem(monitor.getItem())

    return { containerId }
  },

  canDrop(props, monitor) {
    return monitor.getItem().content !== ''
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
    canDrop: monitor.canDrop()
  }
}

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
  removeFromArticles: number => Object
};

class Sidebar extends Component<SidebarProps> {
  componentDidMount() {
    this.props.fetchContent()
  }

  addItem = data => {
    this.props.addNewToArticles(data)
  }

  getHoveredColor = (hovered, canDrop) => {
    if (hovered && canDrop) return '#2ecc71'
    else if (hovered && !canDrop) return '#e74c3c'
    else return '#ecf0f1'
  }

  render() {
    console.log('Sidebar:', this.props)
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

    const backgroundColor = this.getHoveredColor(hovered, canDrop)

    if (error) return <div>Error! {error.message}</div>

    if (loading) return <div>Loading...</div>

    return connectDropTarget(
      <aside className={'Sidebar'} style={{ background: backgroundColor }}>
        <ul className={'Sidebar__blog-list'}>
          {articles.map(article => (
            <Article
              article={article}
              key={article.id}
              containerId={containerId}
              itemDeleter={removeFromArticles}
            />
          ))}
        </ul>
      </aside>
    )
  }
}

const mapStateToProps = state => ({
  articles: getAllArticles(state),
  loading: isAllArticlesLoading(state),
  error: isAllArticlesLoadingError(state)
})

const mapDispatchToProps = {
  addNewToArticles: addArticle,
  fetchContent: fetchArticles,
  removeFromArticles: removeArticle
}

export default compose(
  DropTarget('Article', itemTarget, collect),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Sidebar)
