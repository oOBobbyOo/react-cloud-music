import { combineReducers } from 'redux-immutable'
import { reducer as recommonReducer } from './recommon'
import { reducer as singersReducer } from './singers'
import { reducer as rankReducer } from './rank'
import { reducer as albumReducer } from './album'
import { reducer as singerInfoReducer } from './singer'

const rootReducer = combineReducers({
  recommon: recommonReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
})

export default rootReducer
