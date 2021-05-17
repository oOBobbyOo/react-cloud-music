import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import { debounce } from '@/utils'
import Loading from '../loading'
import Loading2 from '../loading-v2'
import { ScrollContainer, PullUpLoading, PullDownLoading } from './style'

const Scroll = forwardRef((props, ref) => {
  const scrollContaninerRef = useRef()
  const [bScroll, setBScroll] = useState()

  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props
  const { pullUp, pullDown, onScroll } = props

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 500)
  }, [pullUp])

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 500)
  }, [pullDown])

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 监听滚动
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', onScroll)
    return () => {
      bScroll.off('scroll', onScroll)
    }
  }, [onScroll, bScroll])

  // 上拉加载
  useEffect(() => {
    if (!bScroll || !pullUp) return
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullUp)
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, pullUpDebounce, bScroll])

  // 下拉刷新
  useEffect(() => {
    if (!bScroll || !pullDown) return
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }
    bScroll.on('touchEnd', handlePullDown)
    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, pullDownDebounce, bScroll])

  // 重新计算
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  const PullUpdisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' }
  const PullDowndisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' }

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}>
        <Loading2></Loading2>
      </PullDownLoading>
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, //是否支持向上吸顶
  bounceBottom: PropTypes.bool, //是否支持向下吸顶
}

export default Scroll
