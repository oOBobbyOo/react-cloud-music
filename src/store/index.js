import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
const logger = createLogger({ collapsed: true })

const isDevelopment = process.env.NODE_ENV === 'development'
const middleware = [thunk]
const enhancers = isDevelopment ? composeWithDevTools(applyMiddleware(...middleware, logger)) : applyMiddleware(...middleware)

const store = createStore(rootReducer, enhancers)

export default store
