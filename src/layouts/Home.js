import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Top } from './Home.style'

function Home(props) {
  const { route } = props
  return (
    <div>
      <Top>
        <span className='iconfont menu'>&#xe65c;</span>
      </Top>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(Home)
