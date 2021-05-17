import { combineReducers } from 'redux-immutable'
import { reducer as recommonReducer } from './recommon'

const rootReducer = combineReducers({
  recommon: recommonReducer,
})

export default rootReducer
