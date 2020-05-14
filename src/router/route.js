import index from '../pages/index'
import handleButton from '../pages/handleButton/handleButtonDemo'

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
    path: '/handleButton',
    component: handleButton
  }
]
