import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Form, Input, notification, Row, Space } from 'antd';
import { Drawer } from 'antd';
import {
	differenceWith,
	fromPairs,
	identity,
	isEmpty,
	isEqual,
	isNil,
	omit,
	pickBy,
	toPairs,
} from 'lodash';
import {
	deleteUserApi,
	getUserSearchKey,
	updateUserDetail,
} from '../../../redux/features/userSlice';

export const EditDeleteUser = ({ record }) => {
	const [formInstance] = Form.useForm();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	formInstance.setFieldsValue(record);

	const onDeleteUser = (id) => {
		const idUser = JSON.parse(localStorage.getItem('idUser'));
		if (record.userId.toString() === idUser.toString()) {
			notification.error({ message: "User can't delete your account!" });
			return;
		}
		dispatch(deleteUserApi(id))
			.unwrap()
			.then((_originalPromiseResult) => {
				dispatch(getUserSearchKey());
				notification.success({ message: 'Delete user successfully!' });
			})
			.catch((error) => {
				notification.error({
					message: error || 'Delete User failed!',
				});
			});
	};

	const showDrawer = () => {
		const idUser = JSON.parse(localStorage.getItem('idUser'));
		if (!isNil(idUser) && !isEmpty(idUser)) {
			notification.error({ message: 'User is unAuthorization!' });
			return;
		}
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const submitForm = () => {
		const data = formInstance.getFieldsValue();
		const result = pickBy(
			fromPairs(differenceWith(toPairs(data), toPairs(record), isEqual)),
			(v) => identity(v)
		);

		if (isEmpty(result)) {
			dispatch(getUserSearchKey());
			onClose();
			notification.success({ message: "Don't have any update!" });
			return;
		}

		const params = {
			...omit(record, ['userId', 'key']),
			...result,
			id: data.userId,
		};

		dispatch(updateUserDetail(params))
			.unwrap()
			.then((_originalPromiseResult) => {
				dispatch(getUserSearchKey());
				onClose();
				notification.success({ message: 'Edit User successfully!' });
			})
			.catch((error) => {
				notification.error({
					message: error || 'update user failed!',
				});
			});
	};
	return (
		<>
			<Space size="middle">
				<button
					className="border-2 border-[#0a00b6] p-1 px-5 rounded-md text-[#0a00b6]"
					onClick={showDrawer}
				>
					Edit
				</button>
				<button
					className="border-2 border-[#cc6c3c] p-1 px-5 rounded-md text-[#cc6c3c]"
					onClick={() => onDeleteUser(record.userId)}
				>
					Delete
				</button>
			</Space>

			<Drawer
				title="Edit User"
				width={720}
				onClose={onClose}
				open={open}
				bodyStyle={{
					paddingBottom: 80,
				}}
				extra={
					<Space>
						<button
							className="text-white bg-[#0a00b6] h-18 w-24 justify-center flex items-center text-base font-medium py-2 px-4 rounded-full active:scale-95 transition-all ease-in duration-150"
							onClick={submitForm}
						>
							Submit
						</button>
						<button className="hover:underline" onClick={onClose}>
							Cancel
						</button>
					</Space>
				}
			>
				<Form form={formInstance} layout="vertical">
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item name="userId" label="User Id">
								<Input disabled={true} />
							</Form.Item>
						</Col>
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
								hasFeedback
							>
								<Input type="password" placeholder="password" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={<span className="font-medium">Phone Number</span>}
								name="phoneNumber"
								rules={[
									{
										required: true,
										message: 'Please input your phone!',
									},
								]}
							>
								<Input placeholder="phone Number" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Drawer>
		</>
	);
};
