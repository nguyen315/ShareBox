import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';

export const writeToAsyncStorage = createAsyncThunk(
  'storage/write',
  async ({key, value}: any, {}) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
);

export const removeFromAsyncStorage = createAsyncThunk(
  'storage/remove',
  async (key: string, {dispatch}) => {
    await AsyncStorage.removeItem(key);
    if (key === 'auth') {
      dispatch(logout());
    }
  },
);

export const getAsyncStorage = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const getAuthFromAsyncStorage = createAsyncThunk(
  'storage/auth',
  async () => {
    const auth = await getAsyncStorage('auth');
    return auth;
  },
);

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
  extraReducers: builder => {
    builder.addCase(getAuthFromAsyncStorage.fulfilled, (state, {payload}) => {
      if (payload) {
        const {user, token} = payload;
        state.user = user;
        state.token = token;
      }
    });
  },
});

export const userSelector = (state: RootState) => state.auth.user;
export const tokenSelector = (state: RootState) => state.auth.token;

export const {logout, login} = authSlice.actions;

export default authSlice.reducer;
