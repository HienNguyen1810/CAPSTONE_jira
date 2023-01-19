import axiosClient from './axiosClient';

const priorityService = {
	filterPriority: () => {
		return axiosClient.get('Priority/getAll');
	},
};
export default priorityService;
