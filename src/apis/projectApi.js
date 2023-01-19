import { isEmpty, isNil } from 'lodash';
import axiosClient from './axiosClient';

const projectService = {
	projectCategory: () => {
		return axiosClient.get('ProjectCategory');
	},
	createProject: (data) => {
		return axiosClient.post('Project/createProjectAuthorize', data);
	},
	getProjectDetail: (data) => {
		return axiosClient.get(`Project/getProjectDetail?id=${data}`);
	},
	getAllProject: (name) => {
		return axiosClient.get(`Project/getAllProject`, {
			params: {
				...(!isNil(name) && !isEmpty(name) && { keyword: name.trim() }),
			},
		});
	},
	getAllTaskType: () => {
		return axiosClient.get('TaskType/getAll');
	},
	getAllStatus: () => {
		return axiosClient.get('Status/getAll');
	},
	getTaskDetail: (data) => {
		return axiosClient.get(`Project/getTaskDetail?taskId=${data}`);
	},

	getAllPriority: () => {
		return axiosClient.get('Priority/getAll');
	},

	updateProject: (data) => {
		return axiosClient.put(`Project/updateProject?projectId=${data.id}`, data);
	},
	assignUserToProject: (data) => {
		return axiosClient.post('Project/assignUserProject', data);
	},
	assignUserToTask: (data) => {
		return axiosClient.post('Project/assignUserTask', data);
	},
	removeUserFromProject: (data) => {
		return axiosClient.post('Project/removeUserFromProject', data);
	},
	removeUserFromTask: (data) => {
		return axiosClient.post('Project/removeUserFromTask', data);
	},
	createTask: (data) => {
		return axiosClient.post('Project/createTask', data);
	},
	updateTask: (data) => {
		return axiosClient.post('Project/updateTask', data);
	},
	updateStatus: (data) => {
		return axiosClient.put('Project/updateStatus', data);
	},
	updatePriority: (data) => {
		return axiosClient.put('Project/updatePriority', data);
	},
	updateDescription: (data) => {
		return axiosClient.put('Project/updateDescription', data);
	},
	updateTimeTracking: (data) => {
		return axiosClient.put('Project/updateTimeTracking', data);
	},
	updateEstimate: (data) => {
		return axiosClient.put('Project/updateEstimate', data);
	},
	deleteProject: (data) => {
		return axiosClient.delete(`Project/deleteProject?projectId=${data}`, data);
	},
	removeTask: (data) => {
		return axiosClient.delete(`Project/removeTask?taskId=${data}`);
	},
};
export default projectService;
