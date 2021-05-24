import React, { memo, useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'
import * as actionCreators from '@/store/recommon/actionCreators'
import Scroll from '@c/scroll'
import Slider from '@c/slider'
import RecommendList from '@c/list'
import Loading from '@c/loading'
import { Content } from './style'
import { EnterLoading } from './../Singers/style'

function Recommend(props) {
  const { bannerList, recommendList, songsCount, enterLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content play={songsCount}>
      <Scroll className='list' onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
      {renderRoutes(props.route.routes)}
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommon', 'bannerList']),
  recommendList: state.getIn(['recommon', 'recommendList']),
  songsCount: state.getIn(['player', 'playList']).size,
  enterLoading: state.getIn(['recommon', 'enterLoading']),
})

const mapDispatchToProps = (dispatch) => ({
  getBannerDataDispatch: () => dispatch(actionCreators.getBannerList()),
  getRecommendListDataDispatch: () => dispatch(actionCreators.getRecommendList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend))
