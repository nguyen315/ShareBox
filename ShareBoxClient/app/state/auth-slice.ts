import {createSlice} from '@reduxjs/toolkit';
import {apiSlice} from '../services/api';
import {RootState} from './store';

export type User = {
  id: string;
  username: string;
  name: string;
  avatar: string;
};

const initialState: {user: User | null; token: string | null} = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (state, {payload}) => {
        state.token = payload.token;
        state.user = payload.user;
      },
    );
  },
});

export const userSelector = (state: RootState) => state.auth.user;
export const tokenSelector = (state: RootState) => state.auth.token;

export const {logout} = authSlice.actions;

export default authSlice.reducer;
