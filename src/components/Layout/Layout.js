// @flow
import React, { useEffect } from 'react'
import { DropTarget } from 'react-dnd/lib/index'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import {
  fetchArticles,
  fetchLayout,
  fetchRows,
  addArticleToLayout,
  removeArticleFromLayout,
  addNewRowToLayout
} from '../../actions'
import {
  getAllArticles, getAllRows,
  getIdsInLayout, getLayoutParameters
} from '../../reducers'
import Row from './Row'

import './Layout.scss'
import BEM from '../../helpers/BEM'

const b = BEM('Layout')

type LayoutProps = {
  fetchLayout: () => Object | Promise<Object>,
  fetchArticles: () => Object | Promise<Object>,
  fetchRows: () => Object | Promise<Object>,
  articlesInLayout: Array<Object>,
  layoutParameters: Array<Object>,
  rows: Array<any>,
  addArticleToLayout: Object => Object,
  addNewRowToLayout: Object => Object,
  removeArticleFromLayout: number => Object,
  hovered: boolean,
  canDrop: boolean,
  connectDropTarget: Object => Object
}

const Layout = (props: LayoutProps) => {
  const {
    connectDropTarget,
    articlesInLayout,
    fetchLayout,
    fetchArticles,
    fetchRows,
    layoutParameters,
    rows,
    hovered
  } = props

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    fetchLayout()
  }, [])

  useEffect(() => {
    fetchRows()
  }, [])

  return connectDropTarget(
    <div className={b()} style={{ backgroundColor: hovered ? '#ecf0f1' : '#ffffff' }}>
      {rows.map(row =>
        <Row key={row.id}
             row={row.id}
             parameters={layoutParameters.filter(param => param.row === row.id)}
             allParameters={layoutParameters}
             articlesInRow={row.articlesInRow.map(
               id => articlesInLayout.filter(article => article.id === id)[0]
             )}
             articlesIdsInRow={row.articlesInRow}
        />
      )}
    </div>
  )
}

export default flow(
  DropTarget(
    'Article',
    {
      drop: (props, monitor) => {
        if (props.layoutParameters.filter(param => param.id === monitor.getItem().id).length === 0)
          props.addArticleToLayout({
            id: monitor.getItem().id,
            col: '12',
            row: props.addNewRowToLayout().id
          })
      },

      canDrop: (props, monitor) =>
        props.articlesInLayout.filter(article => article.id === monitor.getItem().id).length === 0
    },
    (connect, monitor) => (
      {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        canDrop: monitor.canDrop()
      }
    )
  ),
  connect(
    state => ({
      articlesInLayout: getAllArticles(state).filter(article => getIdsInLayout(state).indexOf(article.id) !== -1),
      layoutParameters: getLayoutParameters(state),
      rows: getAllRows(state)
    }),
    {
      fetchArticles,
      fetchLayout,
      fetchRows,
      addArticleToLayout,
      removeArticleFromLayout,
      addNewRowToLayout
    }
  ))(Layout)