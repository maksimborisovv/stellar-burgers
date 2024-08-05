import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ordersSlice } from '../slices/ordersSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { userSlice } from '../slices/userSlice';
import { profileOrdersSlice } from '../slices/profileOrdersSlice';

const rootReducer = {
  [ordersSlice.name]: ordersSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [profileOrdersSlice.name]: profileOrdersSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
