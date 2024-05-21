import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root_reducer';

// setup 関数を用意してエクスポートする。
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootStoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
