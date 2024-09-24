import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: { userInfo: null, error: null, isAuthenticated: false },
	reducers: {
		setUserInfo(state, action) {
			state.userInfo = action.payload;
			if (action.payload?.id?.length > 0) state.isAuthenticated = true;
		},
		logout(state) {
			state.userInfo = null;
			state.isAuthenticated = false;
		}
	}
});
