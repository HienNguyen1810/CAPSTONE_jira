import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Col, Form, Input, Row } from 'antd';
import { apiHandler } from '../utils/api-handler';
import userService from '../apis/userApi';

const Register = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const [_isLoading, setIsLoading] = useState(false);

	const successCallback = (_values) => {
		setIsLoading(false);

		navigate('/login', { replace: true });
	};

	const onFinish = (values) => {
		setIsLoading(true);
		const service = userService.signUp(values);
		apiHandler({
			service,
			successMessage: 'Register successfully!',
			errorMessage: 'Register failed!',
			successCallback,
		});
	};
	const onFinishFailed = () => {
		setIsLoading(false);
	};
	return (
		<section className="bg-[#651fff] h-[100vh] flex items-center justify-center">
			<div className="login max-w-[520px] mx-auto bg-white p-3 rounded-md">
				<h1 className="text-left border-b border-b-[#DEDDDC] text-[40px] py-6 pt-16 text-[#651fff] font-bold">
					Register
				</h1>
				<div className="mt-6">
					<Form
						form={form}
						className="mt-6"
						layout="vertical"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Row gutter={[12, 2]}>
							<Col span={12}>
								<Form.Item
									label={<span className="font-medium">Email</span>}
									name="email"
									rules={[
										{
											type: 'email',
											message: 'The input is invalid E-mail!',
										},
										{
											required: true,
											message: 'Please input your email!',
										},
									]}
								>
									<Input placeholder="email" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={<span className="font-medium">Name</span>}
									name="name"
									rules={[
										{
											required: true,
											message: 'Please input your name!',
										},
									]}
								>
									<Input placeholder="name" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={<span className="font-medium">Password</span>}
									name="password"
									rules={[
										{
											required: true,
											message: 'Please input your password!',
										},
									]}
									hasFeedback
								>
									<Input type="password" placeholder="password" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={<span className="font-medium">Phone Number</span>}
									name="phone"
									rules={[
										{
											required: true,
											message: 'Please input your phone!',
										},
									]}
								>
									<Input placeholder="phone" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={<span className="font-medium">Password Confirm</span>}
									name="passwordConfirm"
									dependencies={['password']}
									hasFeedback
									rules={[
										{
											required: true,
											message: 'Please confirm your password!',
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue('password') === value) {
													return Promise.resolve();
												}
												return Promise.reject(
													new Error(
														'The two passwords that you entered do not match!'
													)
												);
											},
										}),
									]}
								>
									<Input type="password" placeholder="password confirm" />
								</Form.Item>
							</Col>
							<Col offset={12} className="block text-center">
								<button className="text-white bg-[#0a00b6] h-18 w-32 justify-center flex items-center text-base font-medium py-3 px-7 rounded-full active:scale-75 transition-all ease-in duration-150 mb-3">
									Submit
								</button>
								<Link
									to="/login"
									className="register ml-auto text-[#152AEB] hover:underline"
								>
									Login now?
								</Link>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
		</section>
	);
};

export default Register;
