import { configure } from '@storybook/react'

function loadStories() {
  require('../src/Components/Layout.story')
  require('../src/components/MainPage/MainPage.story')
  require('../src/Components/Posts/Posts.story')
}

configure(loadStories, module)
