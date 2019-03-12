import { configure } from '@storybook/react'

function loadStories() {
  require('../src/Components/MainPage/MainPage.story')
}

configure(loadStories, module)
