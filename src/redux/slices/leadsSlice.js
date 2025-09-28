
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchLeadsByCustomer = createAsyncThunk('leads/fetchByCustomer', async ({customerId})=>{
  const res = await api.get(`/leads?customerId=${customerId}`);
  return { customerId, leads: res.data };
});

export const createLead = createAsyncThunk('leads/create', async (payload)=> {
  const res = await api.post('/leads', payload);
  return res.data;
});

export const updateLead = createAsyncThunk('leads/update', async ({id, ...data})=>{
  const res = await api.put(`/leads/${id}`, data);
  return res.data;
});

export const deleteLead = createAsyncThunk('leads/delete', async (id)=> {
  await api.delete(`/leads/${id}`);
  return id;
});

const leadsSlice = createSlice({
  name: 'leads',
  initialState: { byCustomer: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadsByCustomer.pending, (s)=> { s.loading = true; s.error = null; })
      .addCase(fetchLeadsByCustomer.fulfilled, (s, action)=> { s.loading = false; s.byCustomer[action.payload.customerId] = action.payload.leads; })
      .addCase(fetchLeadsByCustomer.rejected, (s, action)=> { s.loading = false; s.error = action.error.message; })

      .addCase(createLead.fulfilled, (s, action)=> {
        const cid = action.payload.customerId;
        s.byCustomer[cid] = s.byCustomer[cid] || [];
        s.byCustomer[cid].push(action.payload);
      })
      .addCase(updateLead.fulfilled, (s, action)=> {
        const cid = action.payload.customerId;
        if (s.byCustomer[cid]) {
          s.byCustomer[cid] = s.byCustomer[cid].map(l => l.id === action.payload.id ? action.payload : l);
        }
      })
      .addCase(deleteLead.fulfilled, (s, action)=> {
        const id = action.payload;
        for (const cid of Object.keys(s.byCustomer)) {
          s.byCustomer[cid] = s.byCustomer[cid].filter(l => l.id !== id);
        }
      });
  }
});

export default leadsSlice.reducer;
