import React, { useState, useRef, useEffect, memo } from 'react'
import { PropTypes } from 'prop-types'
import Scroll from '@c/scroll'
import { List, ListItem } from './style'

function Horizen(props) {
  const [refreshCategoryScroll, setRefreshCategoryScroll] = useState(false)
  const Category = useRef(null)
  const { list, oldVal, title } = props
  const { handleClick } = props

  useEffect(() => {
    let categoryDOM = Category.current
    let tagElems = categoryDOM.querySelectorAll('span')
    let totalWidth = 0
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth
    })
    totalWidth += 2
    categoryDOM.style.width = `${totalWidth}px`
    setRefreshCategoryScroll(true)
  }, [refreshCategoryScroll])

  const clickHandle = (item) => {
    handleClick(item.key)
  }

  return (
    <Scroll direction={'horizental'} refresh={true}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem key={item.key} className={oldVal === item.key ? 'selected' : ''} onClick={() => clickHandle(item)}>
                {item.name}
              </ListItem>
            )
          })}
        </List>
      </div>
    </Scroll>
  )
}

Horizen.defaultProps = {
  list: [],
  handleClick: null,
}

Horizen.propTypes = {
  list: PropTypes.array,
  handleClick: PropTypes.func,
}

export default memo(Horizen)
