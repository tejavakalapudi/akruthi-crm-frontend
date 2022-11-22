import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import createRootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(routerReducer) // root reducer with router state
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => (
    [...getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  }), routerMiddleware])
});

export const history = createReduxHistory(store);

if (module.hot && process.env.NODE_ENV !== 'production' ) {
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
    store.replaceReducer(connectRouterHistory(nextRootReducer));
  });
}

export default {
  store,
  persistor: persistStore(store)
};
