import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import Header from '@c/header'
import AlbumDetail from '@c/album-detail'
import Scroll from '@c/scroll'
import Loading from '@c/loading'
import { getAlbumList, changePullUpLoading, changeEnterLoading } from '@/store/album/actionCreators'
import { isEmptyObject } from '@/utils'
import { HEADER_HEIGHT } from '@/api/config'
import { EnterLoading } from './../Singers/style'
import { Container } from './style'
import style from '@a/style/common'

function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState('歌单')
  const [isMarquee, setIsMarquee] = useState(false)

  const musicNoteRef = useRef()
  const headerEl = useRef()

  const { currentAlbum, enterLoading, pullUpLoading } = props
  const { getAlbumDataDispatch, changePullUpLoadingStateDispatch } = props
  let currentAlbumJS = currentAlbum.toJS()

  const id = props.match.params.id
  useEffect(() => {
    getAlbumDataDispatch(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleScroll = useCallback(
    (pos) => {
      let minScrollY = -HEADER_HEIGHT
      let percent = Math.abs(pos.y / minScrollY)
      let headerDom = headerEl.current
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style['theme-color']
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2)
        setTitle(currentAlbumJS && currentAlbumJS.name)
        setIsMarquee(true)
      } else {
        headerDom.style.backgroundColor = ''
        headerDom.style.opacity = 1
        setTitle('歌单')
        setIsMarquee(false)
      }
    },
    [currentAlbumJS]
  )

  const handlePullUp = () => {
    changePullUpLoadingStateDispatch(true)
    changePullUpLoadingStateDispatch(false)
  }

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y })
  }

  return (
    <CSSTransition in={showStatus} timeout={300} classNames='fly' appear={true} unmountOnExit onExited={props.history.goBack}>
      <Container>
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
        {!isEmptyObject(currentAlbumJS) ? (
          <Scroll onScroll={handleScroll} pullUp={handlePullUp} pullUpLoading={pullUpLoading} bounceTop={false}>
            <AlbumDetail currentAlbum={currentAlbumJS} pullUpLoading={pullUpLoading} musicAnimation={musicAnimation}></AlbumDetail>
          </Scroll>
        ) : null}
        {enterLoading ? (
          <EnterLoading>
            <Loading></Loading>
          </EnterLoading>
        ) : null}
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  pullUpLoading: state.getIn(['album', 'pullUpLoading']),
  enterLoading: state.getIn(['album', 'enterLoading']),
  startIndex: state.getIn(['album', 'startIndex']),
  totalCount: state.getIn(['album', 'totalCount']),
})

const mapDispatchToProps = (dispatch) => ({
  getAlbumDataDispatch: (id) => {
    dispatch(changeEnterLoading(true))
    dispatch(getAlbumList(id))
  },
  changePullUpLoadingStateDispatch: (state) => {
    dispatch(changePullUpLoading(state))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Album))
