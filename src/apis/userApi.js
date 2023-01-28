import { isEmpty, isNull } from 'lodash';
import axiosClient from './axiosClient';

const userService = {
	signUp: (param) => {
		return axiosClient.post('Users/signup', param);
	},
	signIn: (data) => {
		return axiosClient.post('Users/signin', data);
	},
	signInFacebook: (data) => {
		return axiosClient.post('Users/facebooklogin', data);
	},
	getUserByKeyword: (data) => {
		return axiosClient.get(`Users/getUser`, {
			params: {
				...(!isNull(data) &&
					!isEmpty(data.trim()) && {
						keyword: data.trim(),
					}),
			},
		});
	},
	getUserByProId: (projectID) => {
		return axiosClient.get(`Users/getUserByProjectId?idProject=${projectID}`);
	},
	updateUser: (data) => {
		return axiosClient.put(`Users/editUser`, data);
	},
	deleteUser: (userId) => {
		return axiosClient.delete(`Users/deleteUser?id=${userId}`);
	},
};
export default userService;
