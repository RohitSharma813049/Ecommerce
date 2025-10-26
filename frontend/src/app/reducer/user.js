import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user,
  role: user?.role,
  token: token,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.token = action.payload.token;   // fix here
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');  // optionally clear localStorage on logout
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
