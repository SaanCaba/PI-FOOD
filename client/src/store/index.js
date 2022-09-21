import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk';

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk)),
);
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
//redux-devtools-extension es una libreria que nos permite, no escribir todo lo de arriba, lo simplifica.
export default store;