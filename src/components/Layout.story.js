import React from 'react'
import { storiesOf } from '@storybook/react'

import Provider from './Provider'
import configureStore from '../configureStore'

import Layout from './Layout'

const store = configureStore()

const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
)

storiesOf('Layout', module)
  .addDecorator(withProvider)
  .add('default', () => <Layout/>)