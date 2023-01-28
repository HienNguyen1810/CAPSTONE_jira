import React from 'react';
import ReactFacebookLogin from 'react-facebook-login';
import { FiFacebook } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import useAuth from '../hooks/use-auth';
import userService from '../apis/userApi';

function LoginFacebook() {
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const responseFacebook = (response) => {
		userService
			.signInFacebook({
				facebookToken: response.accessToken,
			})
			.then((res) => {
				if (!res?.data?.content?.accessToken || !res?.data?.content?.email) {
					notification.warning({
						message: <p>failed to login facebook, please try again!</p>,
					});
					return;
				}
				localStorage.setItem(
					'token',
					JSON.stringify(res.data.content.accessToken)
				);
				const email = res.data.content.email;
				localStorage.setItem('email', JSON.stringify(email));
				console.log(email);
				console.log(res);
				userService.getUserByKeyword(email?.slice('.')[0]).then((res) => {
					console.log(res);
					localStorage.setItem(
						'idUser',
						JSON.stringify(res.data.content[0].id)
					);
				});
				setAuth({ email });
				navigate(from, { replace: true, state: '' });
			});
	};

	return (
		<div>
			<ReactFacebookLogin
				appId="1290683881502110"
				autoLoad={false}
				fields="name,email,picture"
				callback={responseFacebook}
				cssClass=" text-white w-full rounded-full bg-[#0100ca] p-4 flex items-center justify-center"
				icon={<FiFacebook size={20} />}
			/>
		</div>
	);
}

export default LoginFacebook;
