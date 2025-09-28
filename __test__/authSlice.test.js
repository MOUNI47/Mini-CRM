
import authReducer, { logout } from '../src/redux/slices/authSlice';

describe('auth reducer', () => {
  const initialState = { user: null, token: null, loading: false, error: null };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle logout', () => {
    const prev = { user: { id:1 }, token: 'abc', loading:false, error:null };
    expect(authReducer(prev, logout())).toEqual({ user: null, token: null, loading:false, error:null });
  });
});
