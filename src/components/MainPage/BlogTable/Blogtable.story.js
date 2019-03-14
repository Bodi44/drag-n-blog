import React from 'react'
import { storiesOf } from '@storybook/react'

import Provider from '../../Provider'
import configureStore from '../../../configureStore'

import BlogTable from './BlogTable'

const store = configureStore()

const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
)

storiesOf('BlogTable', module)
  .addDecorator(withProvider)
  .add('default', () => <BlogTable containerId={1}/>)
