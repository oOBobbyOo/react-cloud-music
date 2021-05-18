import { combineReducers } from 'redux-immutable'
import { reducer as recommonReducer } from './recommon'
import { reducer as singersReducer } from './singers'
import { reducer as rankReducer } from './rank'

const rootReducer = combineReducers({
  recommon: recommonReducer,
  singers: singersReducer,
  rank: rankReducer,
})

export default rootReducer
