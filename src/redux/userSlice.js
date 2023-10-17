import { createSlice } from '@reduxjs/toolkit';

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
    logOutAction(state) {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const isLoggedIn = state => state.user.isLoggedIn;
export const { logInAction, logOutAction } = userSlice.actions;
export const userReducer = userSlice.reducer;
