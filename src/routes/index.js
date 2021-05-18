import React, { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'

import BlankLayout from '../layouts/BlankLayout'
import HomeLayout from '../layouts/HomeLayout'

const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const RecommendComponent = lazy(() => import('../application/Recommend/'))
const SingersComponent = lazy(() => import('../application/Singers'))
const RankComponent = lazy(() => import('../application/Rank'))

const routes = [
  {
    component: BlankLayout,
    routes: [
      {
        path: '/',
        component: HomeLayout,
        routes: [
          {
            path: '/',
            exact: true,
            render: () => <Redirect to={'/recommend'} />,
          },
          {
            path: '/recommend',
            component: SuspenseComponent(RecommendComponent),
          },
          {
            path: '/singers',
            component: SuspenseComponent(SingersComponent),
            key: 'singers',
          },
          {
            path: '/rank/',
            component: SuspenseComponent(RankComponent),
            key: 'rank',
          },
        ],
      },
    ],
  },
]

export default routes
