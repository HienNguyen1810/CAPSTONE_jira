import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { omit } from 'lodash';
import useAuth from '../hooks/use-auth';
import { apiHandler } from '../utils/api-handler';
import userService from '../apis/userApi';
import '../styles/login.less';
import LoginFacebook from './LoginFacebook';

const Login = () => {
	const { setAuth } = useAuth();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const successCallback = (values) => {
		setIsLoading(false);
		setAuth(omit(values.content, ['accessToken']));
		localStorage.setItem('token', JSON.stringify(values.content.accessToken));
		localStorage.setItem('email', JSON.stringify(values.content.email));
		localStorage.setItem('idUser', JSON.stringify(values.content.id));

		navigate(from, { replace: true, state: '' });
	};

	const failCallback = () => {
		setIsLoading(false);
	};

	const onFinish = (values) => {
		setIsLoading(true);
		const service = userService.signIn(values);
		apiHandler({
			service,
			successMessage: 'login successfully!',
			errorMessage: 'login failed',
			failCallback,
			successCallback,
		});
	};
	const onFinishFailed = () => {
		setIsLoading(false);
	};

	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 20,
			}}
			spin
		/>
	);

	return (
		<section className="login max-w-[1120px] mx-auto">
			<h1 className="text-left border-b border-b-[#DEDDDC] text-[40px] py-6 pt-16 text-[#651fff] font-bold">
				Jira Project
			</h1>
			<div className="max-w-[300px] mx-auto mt-6 shadow-sm">
				<Form
					layout="vertical"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label={<span className="font-medium">Email</span>}
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
							{
								type: 'email',
								message: 'The input is invalid E-mail!',
							},
						]}
					>
						<Input placeholder="email" />
					</Form.Item>

					<Form.Item
						label={<span className="font-medium">Password</span>}
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password placeholder="password" />
					</Form.Item>

					<div className="flex items-center gap-3 mb-6">
						<Link
							to="/register"
							className="register ml-auto text-[#152AEB] hover:underline"
						>
							Register now ?
						</Link>
						<button
							disabled={isLoading}
							className={`text-white bg-[#0a00b6] h-18 w-32 justify-center flex items-center text-base font-medium py-3 px-7 rounded-full active:scale-75 transition-all ease-in duration-150 ${
								isLoading ? 'cursor-wait' : ''
							}`}
						>
							{isLoading ? <Spin indicator={antIcon} /> : <span>Login</span>}
						</button>
					</div>
				</Form>
				<LoginFacebook />
			</div>
		</section>
	);
};

export default Login;
