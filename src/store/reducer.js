import { combineReducers } from 'redux-immutable'
import { reducer as recommonReducer } from './recommon'
import { reducer as singersReducer } from './singers'
import { reducer as rankReducer } from './rank'
import { reducer as albumReducer } from './album'
import { reducer as singerInfoReducer } from './singer'
import { reducer as searchReducer } from './search'

const rootReducer = combineReducers({
  recommon: recommonReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  search: searchReducer,
})

export default rootReducer
