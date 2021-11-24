import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import mainReducer from '../reducers/main'
// import pokemonReducer from './reducers'

import ṕokemonSaga from '../sagas/pokemonSaga'

const sagaMiddleware = createSagaMiddleware()

// const combinedReducers = combineReducers({
//   mainReducer,
//   pokemonReducer
// });

const store = createStore(
  mainReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(ṕokemonSaga)

export default store;