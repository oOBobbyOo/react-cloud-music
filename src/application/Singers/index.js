import React, { memo, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import LazyLoad, { forceCheck } from 'react-lazyload'
import Horizen from '@c/horizen-item'
import Scroll from '@c/scroll'
import Loading from '@c/loading'
import { categoryTypes, alphaTypes } from '@/api/config'
import { NavContainer, ListContainer, List, ListItem, EnterLoading } from './style'
import {
  getSingerList,
  changeCategory,
  changeAlpha,
  getHotSingerList,
  changeListOffset,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from '@/store/singers/actionCreators'

function Singers(props) {
  const scrollRef = useRef(null)

  const { singerList, category, alpha, pageCount, pullUpLoading, pullDownLoading, enterLoading } = props

  const { getHotSinger, updateCategory, updateAlpha, pullUpRefresh, pullDownRefresh } = props

  useEffect(() => {
    console.log(scrollRef)
    if (!singerList.length && !category && !alpha) {
      getHotSinger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePullUp = () => {
    pullUpRefresh(category === '', pageCount)
  }

  const handlePullDown = () => {
    pullDownRefresh(category, pageCount)
  }

  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`)
  }

  const handleUpdateCategory = (newVal) => {
    if (category === newVal) return
    updateCategory(newVal)
    scrollRef.current.refresh()
  }

  const handleUpdateAlpha = (newVal) => {
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
        <Horizen title={'分类(默认热门):'} list={categoryTypes} handleClick={(v) => handleUpdateCategory(v)} oldVal={category}></Horizen>
        <Horizen title={'首字母:'} list={alphaTypes} handleClick={(v) => handleUpdateAlpha(v)} oldVal={alpha}></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll ref={scrollRef} onScroll={forceCheck} pullUp={handlePullUp} pullDown={handlePullDown} pullUpLoading={pullUpLoading} pullDownLoading={pullDownLoading}>
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

const mapStateToProps = (state) => ({
  alpha: state.getIn(['singers', 'alpha']),
  category: state.getIn(['singers', 'category']),
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
})

const mapDispatchToProps = (dispatch) => ({
  getHotSinger: () => dispatch(getHotSingerList()),
  updateCategory: (newVal) => {
    dispatch(changeCategory(newVal))
    dispatch(getSingerList())
  },
  updateAlpha: (newVal) => {
    dispatch(changeAlpha(newVal))
    dispatch(getSingerList())
  },
  // 滑到最底部刷新部分的处理
  pullUpRefresh: (hot, count) => {
    dispatch(changePullUpLoading(true))
    if (hot) {
      dispatch(refreshMoreHotSingerList())
    } else {
      dispatch(refreshMoreSingerList())
    }
  },
  //顶部下拉刷新
  pullDownRefresh: (category, alpha) => {
    dispatch(changePullDownLoading(true))
    dispatch(changeListOffset(0))
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList())
    } else {
      dispatch(getSingerList())
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers))
