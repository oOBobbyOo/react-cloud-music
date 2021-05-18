import { combineReducers } from 'redux-immutable'
import { reducer as recommonReducer } from './recommon'
import { reducer as singersReducer } from './singers'
import { reducer as rankReducer } from './rank'
import { reducer as albumReducer } from './album'

const rootReducer = combineReducers({
  recommon: recommonReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
})

export default rootReducer
