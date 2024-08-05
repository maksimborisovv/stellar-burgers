import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser;
  authError: SerializedError | null;
}

const initialState: TUserState = {
  isAuthChecked: true,
  isAuthenticated: false,
  user: { name: '', email: '' },
  authError: null
};

export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const getUser = createAsyncThunk('user/get', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectAuthError: (state) => state.authError
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.authError = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
        state.authError = action.error;
      })
      .addCase(register.pending, (state) => {
        state.isAuthChecked = false;
      });

    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.authError = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
        state.authError = action.error;
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
      });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.isAuthenticated = false;
      state.user = { email: '', name: '' };
    });
  }
});

export const {
  selectUser,
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectAuthError
} = userSlice.selectors;
