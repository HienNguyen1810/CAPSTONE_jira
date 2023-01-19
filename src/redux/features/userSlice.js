import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../../apis/userApi';

export const getUserSearchKey = createAsyncThunk(
	'user/get-user-search-key',
	async (value, { signal, rejectWithValue }) => {
		try {
			const response = await userService.getUserByKeyword(value);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const fetchUserByProjectId = createAsyncThunk(
	'user/fetch-user-by-project-id',
	async (params, { signal, dispatch, rejectWithValue }) => {
		try {
			const response = await userService.getUserByProId(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userList: null,
		status: 'idle',
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserSearchKey.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getUserSearchKey.fulfilled, (state, action) => {
				state.userList = action.payload;
				state.status = 'idle';
			});
	},
});

export const userLoading = (state) => state.userReducer.status;
export const userList = (state) => state.userReducer.userList;

export default userSlice.reducer;
