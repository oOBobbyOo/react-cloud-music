import React, { memo, forwardRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getName } from '@/utils'
import { ONE_PAGE_COUNT } from '@/api/config'
import { SongList, SongItem } from './style'
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from '@/store/player/actionCreators'

const SongsList = forwardRef((props, refs) => {
  const [startIndex, setStartIndex] = useState(0)

  const { songs, collectCount, showCollect, loading = false, usePageSplit } = props

  const { musicAnimation } = props
  const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props
  const totalCount = songs.length

  useEffect(() => {
    if (!loading) return
    if (startIndex + 1 + ONE_PAGE_COUNT >= totalCount) return
    setStartIndex(startIndex + ONE_PAGE_COUNT)
  }, [loading, startIndex, totalCount])

  let songList = (list) => {
    let res = []
    // 判断页数是否超过总数
    let end = usePageSplit ? startIndex + ONE_PAGE_COUNT : list.length
    for (let i = 0; i < end; i++) {
      if (i >= list.length) break
      let item = list[i]
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className='index'>{i + 1}</span>
          <div className='info'>
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} - {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res
  }

  const selectItem = (e, index) => {
    changePlayListDispatch(songs)
    changeSequecePlayListDispatch(songs)
    changeCurrentIndexDispatch(index)
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY)
  }

  const collect = (count) => {
    return (
      <div className='add_list'>
        <i className='iconfont'>&#xe62d;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
      // <div className="isCollected">
      //   <span>已收藏({Math.floor(count/1000)/10}万)</span>
      // </div>
    )
  }

  return (
    <SongList ref={refs} showBackground={props.showBackground}>
      <div className='first_line'>
        <div className='play_all' onClick={(e) => selectItem(e, 0)}>
          <i className='iconfont'>&#xe6e3;</i>
          <span>
            播放全部 <span className='sum'>(共{totalCount}首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongList>
  )
})

const mapStateToProps = (state) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  scrollY: state.getIn(['album', 'scrollY']),
})

const mapDispatchToProps = (dispatch) => ({
  changePlayListDispatch: (data) => dispatch(changePlayList(data)),
  changeCurrentIndexDispatch: (data) => dispatch(changeCurrentIndex(data)),
  changeSequecePlayListDispatch: (data) => dispatch(changeSequecePlayList(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(SongsList))
