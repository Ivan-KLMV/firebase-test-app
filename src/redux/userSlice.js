import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { database } from '../firebase/config';
import { ref } from 'firebase/storage';
import { onValue } from 'firebase/database';

const initialState = { user: {}, isLoggedIn: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInAction(state, action) {
      console.log('userSlice', action.payload);
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logOutAction(state, action) {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const isLoggedIn = state => state.user.isLoggedIn;
export const { logInAction, logOutAction } = userSlice.actions;
export const userReducer = userSlice.reducer;
