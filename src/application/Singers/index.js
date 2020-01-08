import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import LazyLoad, { forceCheck } from 'react-lazyload'
import {
  getSingerList,
  changeCategory,
  changeAlpha,
  getHotSingerList,
  changeEnterLoading,
  changeListOffset,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/action'
import { NavContainer, ListContainer, List, ListItem, EnterLoading } from './style'
import { categoryTypes, alphaTypes } from '../../api/config'
import Horizen from '../../components/horizen/index'
import Scroll from '../../components/scroll/index'
import Loading from '../../components/loading-v2/index'

function Singers(props) {
  const scrollRef = useRef(null)

  const { singerList, category, alpha, pageCount, songsCount, pullUpLoading, pullDownLoading, enterLoading } = props

  const { getHotSinger, updateCategory, updateAlpha, pullUpRefresh, pullDownRefresh } = props

  useEffect(() => {
    if (!singerList.toJS().length && !category && !alpha) {
      getHotSinger()
    }
    // eslint-disable-next-line
  }, [])

  const enterDetail = id => {
    props.history.push(`/singers/${id}`)
  }

  const handlePullUp = () => {
    pullUpRefresh(category === '', pageCount)
  }

  const handlePullDown = () => {
    pullDownRefresh(category, pageCount)
  }

  const handleUpdateCategory = newVal => {
    if (category === newVal) return
    updateCategory(newVal)
    scrollRef.current.refresh()
  }

  const handleUpdateAlpha = newVal => {
    if (alpha === newVal) return
    updateAlpha(newVal)
    scrollRef.current.refresh()
  }

  const renderSingerList = () => {
    return (
      <List>
        {singerList.toJS().map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index} onClick={() => enterDetail(item.id)}>
              <div className='img_wrapper'>
                <LazyLoad placeholder={<img width='100%' height='100%' src={require('./singer.png')} alt='music' />}>
                  <img src={`${item.picUrl}?param=300x300`} width='100%' height='100%' alt='music' />
                </LazyLoad>
              </div>
              <span className='name'>{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }

  return (
    <div>
      <NavContainer>
        <Horizen title={'分类(默认热门):'} list={categoryTypes} handleClick={v => handleUpdateCategory(v)} oldVal={category}></Horizen>
        <Horizen title={'首字母:'} list={alphaTypes} handleClick={v => handleUpdateAlpha(v)} oldVal={alpha}></Horizen>
      </NavContainer>

      <ListContainer play={songsCount}>
        <Scroll onScroll={forceCheck} pullUp={handlePullUp} pullDown={handlePullDown} ref={scrollRef} pullUpLoading={pullUpLoading} pullDownLoading={pullDownLoading}>
          {renderSingerList()}
        </Scroll>
      </ListContainer>

      {/* 入场加载动画 */}
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}

      {renderRoutes(props.route.routes)}
    </div>
  )
}

const mapStateToProps = state => ({
  alpha: state.getIn(['singers', 'alpha']),
  category: state.getIn(['singers', 'category']),
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
  songsCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = dispatch => {
  return {
    getHotSinger() {
      dispatch(getHotSingerList())
    },
    updateCategory(newVal) {
      dispatch(changeCategory(newVal))
      dispatch(changeListOffset(0))
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList())
    },
    updateAlpha(newVal) {
      dispatch(changeAlpha(newVal))
      dispatch(changeListOffset(0))
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList())
    },
    // 滑到最底部刷新部分的处理
    pullUpRefresh(hot, count) {
      dispatch(changePullUpLoading(true))
      if (hot) {
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreSingerList())
      }
    },
    //顶部下拉刷新
    pullDownRefresh(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changeListOffset(0))
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList())
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singers)
