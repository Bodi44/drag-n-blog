import { configure } from '@storybook/react'

function loadStories() {
  require('../src/Components/Layout.story')
  require('../src/Components/MainPage/MainPage.story')
  require('../src/Components/Posts/Posts.story')
}

configure(loadStories, module)
