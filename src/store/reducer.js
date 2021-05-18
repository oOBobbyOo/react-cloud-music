import { combineReducers } from 'redux-immutable'
import { reducer as recommonReducer } from './recommon'
import { reducer as singersReducer } from './singers'

const rootReducer = combineReducers({
  recommon: recommonReducer,
  singers: singersReducer,
})

export default rootReducer
