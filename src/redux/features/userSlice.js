import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import userService from '../../apis/userApi';

export const getUserSearchKey = createAsyncThunk(
	'user/get-user-search-key',
	async (value, { rejectWithValue }) => {
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
	async (params, { _signal, _dispatch, rejectWithValue }) => {
		try {
			const response = await userService.getUserByProId(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const deleteUserApi = createAsyncThunk(
	'user/remove-user',
	async (params, { rejectWithValue }) => {
		try {
			const response = await userService.deleteUser(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const updateUserDetail = createAsyncThunk(
	'project/update-user-detail',
	async (params, { rejectWithValue }) => {
		try {
			const response = await userService.updateUser(params);
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
			.addCase(getUserSearchKey.pending, (state, _action) => {
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

export const userListMapping = createSelector(userList, (userList) => {
	return userList?.map((item) => ({
		...item,
		key: item.userId,
	}));
});

export default userSlice.reducer;
