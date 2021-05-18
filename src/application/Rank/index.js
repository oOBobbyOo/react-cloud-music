import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import Scroll from '@c/scroll'
import Loading from '@c/loading'
import { getRankList } from '@/store/rank/actionCreators'
import { filterIndex } from '@/utils'
import { List, ListItem, SongList, Container } from './style'
import { EnterLoading } from './../Singers/style'

function Rank(props) {
  const { rankList: list, loading } = props
  const { getRankListDataDispatch } = props

  let rankList = list ? list.toJS() : []

  useEffect(() => {
    if (!rankList.length) {
      getRankListDataDispatch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`)
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          )
        })}
      </SongList>
    ) : null
  }

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item, index) => {
          return (
            <ListItem key={`${item.coverImgId}${index}`} tracks={item.tracks} onClick={() => enterDetail(item)}>
              <div className='img_wrapper'>
                <img src={item.coverImgUrl} alt='' />
                <div className='decorate'></div>
                <span className='update_frequecy'>{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          )
        })}
      </List>
    )
  }

  let globalStartIndex = filterIndex(rankList)
  let officialList = rankList.slice(0, globalStartIndex)
  let globalList = rankList.slice(globalStartIndex)
  let displayStyle = loading ? { display: 'none' } : { display: '' }
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className='offical' style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className='global' style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
})

const mapDispatchToProps = (dispatch) => ({
  getRankListDataDispatch: () => dispatch(getRankList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Rank))
