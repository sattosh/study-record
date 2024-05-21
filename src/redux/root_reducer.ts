import { combineReducers } from '@reduxjs/toolkit';
import * as modules from './modules';

export const rootReducer = combineReducers({
  notification: modules.notificationSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
