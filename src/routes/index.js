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

const RecommendComponent = lazy(() => import('../application/Recommend'))
const AlbumComponent = lazy(() => import('../application/Album'))
const SingersComponent = lazy(() => import('../application/Singers'))
const SingerComponent = lazy(() => import('./../application/Singer'))
const RankComponent = lazy(() => import('../application/Rank'))
const SearchComponent = lazy(() => import('../application/Search'))

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
            routes: [
              {
                path: '/recommend/:id',
                component: SuspenseComponent(AlbumComponent),
              },
            ],
          },
          {
            path: '/singers',
            component: SuspenseComponent(SingersComponent),
            key: 'singers',
            routes: [
              {
                path: '/singers/:id',
                component: SuspenseComponent(SingerComponent),
              },
            ],
          },
          {
            path: '/rank/',
            component: SuspenseComponent(RankComponent),
            key: 'rank',
            routes: [
              {
                path: '/rank/:id',
                component: SuspenseComponent(AlbumComponent),
              },
            ],
          },
          {
            path: '/album/:id',
            exact: true,
            key: 'album',
            component: SuspenseComponent(AlbumComponent),
          },
          {
            path: '/search',
            exact: true,
            key: 'search',
            component: SuspenseComponent(SearchComponent),
          },
        ],
      },
    ],
  },
]

export default routes
