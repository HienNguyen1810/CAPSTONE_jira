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
		return axiosClient.get(`Users/getUser?keyword=${data}`);
	},
	getUserByProId: (projectID) => {
		return axiosClient.get(`Users/getUserByProjectId?idProject=${projectID}`);
	},
};
export default userService;
