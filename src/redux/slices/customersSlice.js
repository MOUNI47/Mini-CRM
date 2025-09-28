
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchCustomers = createAsyncThunk('customers/fetch', async ({page=1, limit=20, q=''} = {}) => {
  const res = await api.get(`/customers?_page=${page}&_limit=${limit}&q=${encodeURIComponent(q)}`);
  return { data: res.data, total: parseInt(res.headers['x-total-count'] || res.data.length) };
});

export const createCustomer = createAsyncThunk('customers/create', async (payload) => {
  const res = await api.post('/customers', payload);
  return res.data;
});

export const updateCustomer = createAsyncThunk('customers/update', async ({id, ...data}) => {
  const res = await api.put(`/customers/${id}`, data);
  return res.data;
});

export const deleteCustomer = createAsyncThunk('customers/delete', async (id) => {
  await api.delete(`/customers/${id}`);
  return id;
});

const customersSlice = createSlice({
  name: 'customers',
  initialState: { list: [], total: 0, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (s)=> { s.loading = true; s.error = null; })
      .addCase(fetchCustomers.fulfilled, (s, action)=> { s.loading = false; s.list = action.payload.data; s.total = action.payload.total; })
      .addCase(fetchCustomers.rejected, (s, action)=> { s.loading = false; s.error = action.error.message; })

      .addCase(createCustomer.fulfilled, (s, action)=> { s.list.unshift(action.payload); s.total += 1; })
      .addCase(updateCustomer.fulfilled, (s, action)=> {
        const idx = s.list.findIndex(c => c.id === action.payload.id);
        if (idx >= 0) s.list[idx] = action.payload;
      })
      .addCase(deleteCustomer.fulfilled, (s, action)=> {
        s.list = s.list.filter(c => c.id !== action.payload);
        s.total -= 1;
      });
  }
});

export default customersSlice.reducer;
