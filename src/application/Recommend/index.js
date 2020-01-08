import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'
import { renderRoutes } from 'react-router-config'
import { actionCreators } from './store/index'
import { Content } from './style'
import Scroll from '../../components/scroll/index'
import Slider from '../../components/slider/index'
import RecommendList from '../../components/list/index'
import Loading from '../../components/loading-v2/index'
import { EnterLoading } from './../Singers/style'

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Content>
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

const mapStateToProps = state => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
})

const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch() {
      dispatch(actionCreators.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionCreators.getRecommendList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
