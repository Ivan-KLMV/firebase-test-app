import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import { userFirebaseApi } from './userFirebaseApi';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const reducer = {
  user: persistedReducer,
  [userFirebaseApi.reducerPath]: userFirebaseApi.reducer,
};
export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    userFirebaseApi.middleware,
  ],
});

export const persistor = persistStore(store);
