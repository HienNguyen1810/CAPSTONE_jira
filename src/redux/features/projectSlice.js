import { createSelector } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectService from '../../apis/projectApi';

export const getProjectCategory = createAsyncThunk(
	'project/get-project-category',
	async (_, { rejectWithValue }) => {
		try {
			const response = await projectService.projectCategory('');
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getProjectList = createAsyncThunk(
	'project/get-project-list',
	async (params, { rejectWithValue }) => {
		const value = params || '';
		try {
			const response = await projectService.getAllProject(value);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createProject = createAsyncThunk(
	'project/create-project',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.createProject(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const getProjectDetail = createAsyncThunk(
	'project/get-project-detail',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.getProjectDetail(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const assignUser = createAsyncThunk(
	'project/assign-user',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.assignUserToProject(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const removeUserFromProject = createAsyncThunk(
	'project/remove-user-from-project',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.removeUserFromProject(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const deleteProjectApi = createAsyncThunk(
	'project/remove-project',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.deleteProject(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const updateProjectDetail = createAsyncThunk(
	'project/update-project-detail',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.updateProject(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const getAllStatus = createAsyncThunk(
	'project/get-all-status',
	async (_params, { rejectWithValue }) => {
		try {
			const response = await projectService.getAllStatus();
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const getAllPriority = createAsyncThunk(
	'project/get-all-priority',
	async (_params, { rejectWithValue }) => {
		try {
			const response = await projectService.getAllPriority();
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const getTaskType = createAsyncThunk(
	'project/get-task-type',
	async (_params, { rejectWithValue }) => {
		try {
			const response = await projectService.getAllTaskType();
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const removeTask = createAsyncThunk(
	'project/remove-task',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.removeTask(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const createTask = createAsyncThunk(
	'project/create-task',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.createTask(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const getTaskDetail = createAsyncThunk(
	'project/get-task-detail',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.getTaskDetail(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const updateTask = createAsyncThunk(
	'project/update-task',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.updateTask(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const updateStatus = createAsyncThunk(
	'project/update-status',
	async (params, { rejectWithValue }) => {
		try {
			const response = await projectService.updateStatus(params);
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error.response.data.content);
		}
	}
);

export const projectSlice = createSlice({
	name: 'project',
	initialState: {
		projectCategory: null,
		status: 'idle',
		projectList: [],
		projectDetail: null,
		taskStatus: [],
		taskType: [],
		taskPriority: [],
		taskDetail: null,
	},
	reducers: {
		setProjectDetail: (state, action) => {
			state.projectDetail = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProjectCategory.pending, (state, _action) => {
				state.status = 'loading';
			})
			.addCase(getProjectCategory.fulfilled, (state, action) => {
				state.projectCategory = action.payload;
				state.status = 'idle';
			})
			.addCase(getProjectList.pending, (state, _action) => {
				state.status = 'loading';
			})
			.addCase(getProjectList.fulfilled, (state, action) => {
				state.projectList = action.payload;
				state.status = 'idle';
			})
			.addCase(getAllStatus.pending, (state, _action) => {
				state.status = 'loading';
			})
			.addCase(getAllStatus.fulfilled, (state, action) => {
				state.taskStatus = action.payload;
				state.status = 'idle';
			})
			.addCase(getAllPriority.pending, (state, _action) => {
				state.status = 'loading';
			})
			.addCase(getAllPriority.fulfilled, (state, action) => {
				state.taskPriority = action.payload;
				state.status = 'idle';
			})
			.addCase(getTaskType.pending, (state, _action) => {
				state.status = 'loading';
			})
			.addCase(getTaskType.fulfilled, (state, action) => {
				state.taskType = action.payload;
				state.status = 'idle';
			})
			.addCase(getTaskDetail.pending, (state, _action) => {
				state.status = 'loading';
			})
			.addCase(getTaskDetail.fulfilled, (state, action) => {
				state.taskDetail = action.payload;
				state.status = 'idle';
			});
	},
});

export const userLoading = (state) => state.projectReducer.status;
export const projectCategory = (state) => state.projectReducer.projectCategory;
export const projectList = (state) => state.projectReducer.projectList;
export const projectDetail = (state) => state.projectReducer.projectDetail;
export const taskStatus = (state) => state.projectReducer.taskStatus;
export const taskType = (state) => state.projectReducer.taskType;
export const taskPriority = (state) => state.projectReducer.taskPriority;

export const { setProjectDetail } = projectSlice.actions;

export const projectListMapping = createSelector(projectList, (projectList) => {
	return projectList?.map((item) => ({
		...item,
		// creator: item.creator.name,
		key: item.id,
	}));
});

export default projectSlice.reducer;
