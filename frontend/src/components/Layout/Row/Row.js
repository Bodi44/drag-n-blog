// @flow
import React, { useEffect, useState } from 'react'
import { DropTarget } from 'react-dnd/lib/index'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import {
  addArticleToLayout,
  removeArticleFromLayout,
  removeArticleFromRow,
  updateLayout,
  deleteRowFromLayout
} from '../../../actions'
import LayoutArticle from '../LayoutArticle'

import './Row.scss'
import '../../../grid.scss'
import BEM from '../../../helpers/BEM'

const b = BEM('Row')

type RowProps = {
  row: string,
  articlesInRow: Array<Object>,
  parameters: Array<Object>,
  connectDropTarget: Object => Object,
  articlesIdsInRow: Array<string>
}

const Row = ({ row, articlesInRow, parameters, connectDropTarget, articlesIdsInRow, hovered, canDrop }: RowProps) => {
  const [dimension, setDimension] = useState(null)
  let container

  useEffect(() => {
    setDimension(container.offsetWidth)
  })

  const setBackgroundColor = () => {
    if (canDrop && hovered)
      return '#81ecec'
    else if (!canDrop && hovered)
      return '#ff7675'
    else return 'none'
  }

  return connectDropTarget(
    <section className={`grid grid_no-transition ${b()}`} ref={el => container = el}
             style={{ backgroundColor: setBackgroundColor() }}>
      {articlesInRow.map(
        (article, i) => articlesInRow[articlesInRow.length - 1] === article ?
          < LayoutArticle
            key={article.id}
            index={i}
            rowId={row}
            containerWidth={dimension}
            article={article}
            allArticlesInRow={articlesIdsInRow}
            parameters={parameters.filter(param => param.id === article.id)[0]}
            resize={false}
          /> :
          <LayoutArticle
            key={article.id}
            index={i}
            rowId={row}
            containerWidth={dimension}
            article={article}
            allArticlesInRow={articlesIdsInRow}
            parameters={parameters.filter(param => param.id === article.id)[0]}
            resize={true}
          />
      )}
    </section>
  )
}

export default flow(
  DropTarget(
    'Article',
    {
      canDrop: props =>
        props.articlesInRow.length < 4
      ,
      drop: (props, monitor) => {
        if (props.articlesIdsInRow.indexOf(monitor.getItem().id) === -1) {
          if (!monitor.getItem().row) {
            if (props.parameters.length !== 0) {
              props.parameters.map(article => props.updateLayout(
                article.id,
                `${12 / (props.parameters.length + 1)}`,
                props.row
              ))
              props.addArticleToLayout({
                id: monitor.getItem().id,
                col: `${12 / (props.parameters.length + 1)}`,
                row: props.row
              })
            } else {
              props.addArticleToLayout({
                id: monitor.getItem().id,
                col: '12',
                row: props.row
              })
            }
          } else {
            props.removeArticleFromRow(monitor.getItem().row, monitor.getItem().id)

            if (props.allRows.filter(row => monitor.getItem().row === row.id)[0].articlesInRow.length === 1)
              props.deleteRowFromLayout(monitor.getItem().row)

            const paramsInRow = props.allParameters.filter(param =>
              param.row === monitor.getItem().row && param.id !== monitor.getItem().id)

            paramsInRow.map(param => props.updateLayout(
              param.id,
              `${12 / (paramsInRow.length - 1)}`,
              param.row
            ))

            props.updateLayout(monitor.getItem().id, monitor.getItem().col, props.row)
          }
        }
      }
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      hovered: monitor.isOver(),
      item: monitor.getItem(),
      canDrop: monitor.canDrop()
    })
  ),
  connect(
    null,
    {
      addArticleToLayout,
      removeArticleFromLayout,
      updateLayout,
      removeArticleFromRow,
      deleteRowFromLayout
    }
  )
)(Row)