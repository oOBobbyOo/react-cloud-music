import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import LazyLoad, { forceCheck } from 'react-lazyload'
import Scroll from '@c/scroll'
import Loading from '@c/loading'
import SearchBox from '@c/search-box'
import MusicalNote from '@c/music-note'
import { getHotKeyWords, changeEnterLoading, getSuggestList } from '@/store/search/actionCreators'
// import { getSongDetail } from '@/store/player/actionCreators'
import { Container, ShortcutWrapper, HotKey } from './style'
import { List, ListItem, EnterLoading } from './../Singers/style'
import { SongItem } from './../Album/style'
import { getName } from '@/utils'

function Search(props) {
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const musicNoteRef = useRef()

  const { hotList, enterLoading, suggestList: immutableSuggestList, songsCount, songsList: immutableSongsList } = props

  const suggestList = immutableSuggestList.toJS()
  const songsList = immutableSongsList.toJS()

  const { getHotKeyWordsDispatch, changeEnterLoadingDispatch, getSuggestListDispatch, getSongDetailDispatch } = props

  useEffect(() => {
    setShow(true)
    if (!hotList.size) getHotKeyWordsDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderHotKey = () => {
    let list = hotList ? hotList.toJS() : []
    return (
      <ul>
        {list.map((item) => {
          return (
            <li className='item' key={item.first} onClick={() => setQuery(item.first)}>
              <span>{item.first}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  const handleQuery = (q) => {
    setQuery(q)
    if (!q) return
    changeEnterLoadingDispatch(true)
    getSuggestListDispatch(q)
  }

  const searchBack = useCallback(() => {
    setShow(false)
  }, [])

  const renderSingers = () => {
    let singers = suggestList.artists
    if (!singers || !singers.length) return
    return (
      <List>
        <h1 className='title'>相关歌手</h1>
        {singers.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index} onClick={() => props.history.push(`/singers/${item.id}`)}>
              <div className='img_wrapper'>
                <LazyLoad placeholder={<img width='100%' height='100%' src={require('./singer.png')} alt='singer' />}>
                  <img src={item.picUrl} width='100%' height='100%' alt='music' />
                </LazyLoad>
              </div>
              <span className='name'>歌手: {item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }

  const renderAlbum = () => {
    let albums = suggestList.playlists
    if (!albums || !albums.length) return
    return (
      <List>
        <h1 className='title'>相关歌单</h1>
        {albums.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index} onClick={() => props.history.push(`/album/${item.id}`)}>
              <div className='img_wrapper'>
                <LazyLoad placeholder={<img width='100%' height='100%' src={require('./music.png')} alt='music' />}>
                  <img src={item.coverImgUrl} width='100%' height='100%' alt='music' />
                </LazyLoad>
              </div>
              <span className='name'>歌单: {item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }

  const selectItem = (e, id) => {
    getSongDetailDispatch(id)
    musicNoteRef.current.startAnimation({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY })
  }

  const renderSongs = () => {
    return (
      <SongItem style={{ paddingLeft: '20px' }}>
        {songsList.map((item) => {
          return (
            <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
              <div className='info'>
                <span>{item.name}</span>
                <span>
                  {getName(item.artists)} - {item.album.name}
                </span>
              </div>
            </li>
          )
        })}
      </SongItem>
    )
  }

  return (
    <CSSTransition in={show} timeout={300} appear={true} classNames='fly' unmountOnExit onExited={() => props.history.goBack()}>
      <Container play={songsCount}>
        <div className='search_box_wrapper'>
          <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className='title'>热门搜索</h1>
                {renderHotKey()}
              </HotKey>
              {/* <SearchHistory>
            <h1 className="title">
              <span className="text">搜索历史</span>
              <span className="clear">
                <i className="iconfont">&#xe63d;</i>
              </span>
            </h1>
            {renderHistoryList()}
          </SearchHistory> */}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {/* 下面为搜索结果 */}
        <ShortcutWrapper show={query}>
          <Scroll onScorll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? (
          <EnterLoading>
            <Loading></Loading>
          </EnterLoading>
        ) : null}
        <MusicalNote ref={musicNoteRef}></MusicalNote>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  hotList: state.getIn(['search', 'hotList']),
  enterLoading: state.getIn(['search', 'enterLoading']),
  suggestList: state.getIn(['search', 'suggestList']),
  songsList: state.getIn(['search', 'songsList']),
})

const mapDispatchToProps = (dispatch) => ({
  getHotKeyWordsDispatch() {
    dispatch(getHotKeyWords())
  },
  changeEnterLoadingDispatch(data) {
    dispatch(changeEnterLoading(data))
  },
  getSuggestListDispatch(data) {
    dispatch(getSuggestList(data))
  },
  getSongDetailDispatch(id) {
    // dispatch(getSongDetail(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Search))
