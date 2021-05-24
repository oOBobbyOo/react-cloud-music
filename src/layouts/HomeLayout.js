import { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import { Top, Tab, TabItem } from './HomeLayout.style'
import Player from '@/application/Player'

const HomeLayout = (props) => {
  const { route } = props
  return (
    <>
      <Top>
        <span className='iconfont menu' onClick={() => alert('用户中心正在开发中，敬请期待:)')}>
          &#xe65c;
        </span>
        <span className='title'>云音悦</span>
        <span className='iconfont search' onClick={() => props.history.push('/search')}>
          &#xe62b;
        </span>
      </Top>
      <Tab>
        <NavLink to='/recommend' activeClassName='selected'>
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to='/singers' activeClassName='selected'>
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to='/rank' activeClassName='selected'>
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      {renderRoutes(route.routes)}
      <Player></Player>
    </>
  )
}

export default memo(HomeLayout)
