import index from '../pages/index'
import handleButton from '../pages/handleButton/handleButtonDemo'
import tableController from '../pages/tableController/tableController'

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
  },
  {
    path: '/tableController',
    component: tableController
  }
]
