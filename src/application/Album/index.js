import React from 'react'
import { connect } from 'react-redux'

function Album(props) {
  return <div>q</div>
}

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
