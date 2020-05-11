import index from '../pages/index'
import sort from '../pages/sort/sortDemo'

export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/sort',
    component: sort
  },
]