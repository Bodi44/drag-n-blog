import React from 'react'
import { storiesOf } from '@storybook/react'

import Provider from '../../Provider'
import configureStore from '../../../store'

import Sidebar from './Sidebar'

const store = configureStore()

const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
)

storiesOf('Sidebar', module)
  .addDecorator(withProvider)
  .add('default', () => <Sidebar containerId={2}/>)