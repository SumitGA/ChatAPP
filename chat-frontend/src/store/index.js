import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const composeEnhancers = composeWithDevTools()
const store = configureStore(
  { reducer: rootReducer },
  composeEnhancers(applyMiddleware(thunk, logger)),
)

export default store
