import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from '../reducers';
import logger from 'redux-logger';
import persistState from 'redux-localstorage';

declare var window: any; // yeah I know, it should be in custom.typings.d.ts

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger),
    persistState() // here we specify data to
  )
);

export default configureStore;