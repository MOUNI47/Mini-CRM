
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const login = createAsyncThunk('auth/login', async ({email, password}, thunkAPI) => {
  const res = await api.get(`/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  const users = res.data;
  if (!users || users.length === 0) throw new Error('Invalid credentials');
  const user = users[0];
  const token = `fake-token-${user.id}-${Date.now()}`;
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
});

export const register = createAsyncThunk('auth/register', async ({email, password, name}, thunkAPI) => {
  const newUser = { email, password, name, role: 'user' };
  const res = await api.post('/users', newUser);
  const user = res.data;
  const token = `fake-token-${user.id}-${Date.now()}`;
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, action) => { s.loading = false; s.user = action.payload.user; s.token = action.payload.token; })
      .addCase(login.rejected, (s, action) => { s.loading = false; s.error = action.error.message; })

      .addCase(register.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(register.fulfilled, (s, action) => { s.loading = false; s.user = action.payload.user; s.token = action.payload.token; })
      .addCase(register.rejected, (s, action) => { s.loading = false; s.error = action.error.message; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
