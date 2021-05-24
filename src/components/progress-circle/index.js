import React, { memo, useRef, useState, useEffect } from 'react'
import { prefixStyle } from '@/utils'
import { ProgressBarWrapper } from './style'

function ProgressCircle(props) {
  const progressBar = useRef()
  const progress = useRef()
  const progressBtn = useRef()
  const [touch, setTouch] = useState({})

  const { percent } = props

  const transform = prefixStyle('transform')

  const progressBtnWidth = 16

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth
      const offsetWidth = percent * barWidth
      progress.current.style.width = `${offsetWidth}px`
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent])

  const _offset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
  }

  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth
    const curPercent = progress.current.clientWidth / barWidth
    props.percentChange(curPercent)
  }

  const progressClick = (e) => {
    const rect = progressBar.current.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left
    _offset(offsetWidth)
    _changePercent(percent)
  }

  const progressTouchStart = (e) => {
    const startTouch = {}
    startTouch.initiated = true
    startTouch.startX = e.touches[0].pageX
    startTouch.left = progress.current.clientWidth
    setTouch(startTouch)
  }

  const progressTouchMove = (e) => {
    if (!touch.initiated) return
    const deltaX = e.touches[0].pageX - touch.startX
    const barWidth = progressBar.current.clientWidth - progressBtnWidth
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
    _offset(offsetWidth)
  }

  const progressTouchEnd = (e) => {
    const endTouch = JSON.parse(JSON.stringify(touch))
    endTouch.initiated = false
    setTouch(endTouch)
    _changePercent()
  }

  return (
    <ProgressBarWrapper>
      <div className='bar-inner' ref={progressBar} onClick={progressClick}>
        <div className='progress' ref={progress}></div>
        <div className='progress-btn-wrapper' ref={progressBtn} onTouchStart={progressTouchStart} onTouchMove={progressTouchMove} onTouchEnd={progressTouchEnd}>
          <div className='progress-btn'></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default memo(ProgressCircle)
