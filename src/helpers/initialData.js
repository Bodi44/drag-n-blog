const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'A Technique for Deciding When to Say No',
      content: 'Instead of trying to do everything, figure out what deserves your time and energy...',
      author: 'Adam Frank',
      time: '~4min.',
    },
    'task-2': {
      id: 'task-2',
      title: 'Facebook Doesn’t Care About You',
      content: 'Scandal after scandal won’t change user behavior — and the company knows it...',
      author: 'Trevor Timm',
      time: '~8min.',
    },
    'task-3': {
      id: 'task-3',
      title: 'As a Designer, I Refuse to Call People ‘Users’',
      content: 'In an industry that touches so many lives, accurate terminology is essential...',
      author: 'Adam Lefton',
      time: '~14min.',
    },
    'task-4': {
      id: 'task-4',
      title: 'How Top-Performing College Grads Fall Into the ‘Prestige Career’ Trap',
      content: 'We funnel our highest achievers into consulting and finance — and it’s hurting all of us...',
      author: 'Indra Sofian',
      time: '~24min.',
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Blog-post',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
  },

  columnOrder: ['column-1'],
}

export const Item1 = [
  {
    id: 'post-1',
    title: 'A Technique for Deciding When to Say No',
    content: 'Instead of trying to do everything, figure out what deserves your time and energy...',
    author: 'Adam Frank',
    time: '~4min.',
  },
  {
    id: 'post-2',
    title: 'Facebook Doesn’t Care About You',
    content: 'Scandal after scandal won’t change user behavior — and the company knows it...',
    author: 'Trevor Timm',
    time: '~8min.',
  },
  {
    id: 'post-3',
    title: 'As a Designer, I Refuse to Call People ‘Users’',
    content: 'In an industry that touches so many lives, accurate terminology is essential...',
    author: 'Adam Lefton',
    time: '~14min.',
  },
  {
    id: 'post-4',
    title: 'How Top-Performing College Grads Fall Into the ‘Prestige Career’ Trap',
    content: 'We funnel our highest achievers into consulting and finance — and it’s hurting all of us...',
    author: 'Indra Sofian',
    time: '~24min.',
  },
  {
    id: 'post-5',
    title: 'Some Title',
    content: 'Post contents',
    author: 'Post Author',
    time: '~post time',
  },
]

export const Item2 = []