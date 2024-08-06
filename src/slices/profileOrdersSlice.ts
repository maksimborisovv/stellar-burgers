import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface ProfileOrdersState {
  isLoading: boolean;
  orders: TOrder[];
}

const initialState: ProfileOrdersState = {
  isLoading: false,
  orders: []
};

export const getProfileOrders = createAsyncThunk(
  'orders/profile',
  getOrdersApi
);

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    selectProfileOrders: (state) => state.orders,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getProfileOrders.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const { selectProfileOrders, selectIsLoading } =
  profileOrdersSlice.selectors;
