import React, { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import HomeLayout from '../application/Home'

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const RecommendComponent = lazy(() => import('../application/Recommend/'))
const SingersComponent = lazy(() => import('../application/Singers/'))
const RankComponent = lazy(() => import('../application/Rank/'))
const AlbumComponent = lazy(() => import('../application/Album/'))

const routes = [
  {
    path: '/',
    component: HomeLayout,
    requiresAuth: false,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={'/recommend'} />
      },
      {
        path: '/recommend',
        component: SuspenseComponent(RecommendComponent),
        routes: [
          {
            path: '/recommend/:id',
            component: SuspenseComponent(AlbumComponent)
          }
        ]
      },
      {
        path: '/singers',
        component: SuspenseComponent(SingersComponent),
        key: 'singers',
        routes: []
      },
      {
        path: '/rank',
        component: SuspenseComponent(RankComponent),
        key: 'rank',
        routes: []
      }
    ]
  }
]

export default routes
