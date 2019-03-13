import React from 'react'
import { storiesOf } from '@storybook/react'

import Provider from '../Provider'
import configureStore from '../../store'

import MainPage from './MainPage'

const store = configureStore()

const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
)

storiesOf('MainPage', module)
  .addDecorator(withProvider)
  .add('default', () => <MainPage/>)
