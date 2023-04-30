import {createSlice} from '@reduxjs/toolkit';
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
    login: (state, {payload}) => {
      const {user, token} = payload;
      state.user = user;
      state.token = token;
    },
  },
});

export const userSelector = (state: RootState) => state.auth.user;
export const tokenSelector = (state: RootState) => state.auth.token;

export const {logout, login} = authSlice.actions;

export default authSlice.reducer;
