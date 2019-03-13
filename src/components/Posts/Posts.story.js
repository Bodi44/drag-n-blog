import React from 'react'
import { storiesOf } from '@storybook/react'

import Provider from '../Provider'
import configureStore from '../../store'

import Posts from './Posts'

const store = configureStore()

const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
)

storiesOf('Posts', module)
  .addDecorator(withProvider)
  .add('default', () => <Posts />)
  // .add('empty', () => <Posts layoutArticles={[]}/>)