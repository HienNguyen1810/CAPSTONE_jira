import React, { useState } from 'react';
import { Button, Form, Input, Space, Table } from 'antd';
import moment from 'moment';
import FormUser from '../components/FormUser';
import ModalEdit from '../components/ModalEdit';
import { useGetListUser } from '../hooks/user.hook';
import { callAPI } from '../utils/axios';
import { apiHandler } from './../utils/api-handler';

function User() {
	const [form] = Form.useForm();
	const title = 'User Edit';
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [resultEdit, setResultEdit] = useState({});
	const [params, setParams] = useState({
		pageIndex: 1,
		pageSize: 10,
		keyword: '',
	});
	const { userList, pagination, refetchGetListUser } = useGetListUser(params);

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onSearch = (keyword) => {
		setParams({
			...params,
			keyword,
		});
	};

	const handleEdit = (record) => {
		setResultEdit(record);
		setIsModalOpen(true);
	};

	const successCallback = () => {
		setIsModalOpen(false);
		refetchGetListUser();
	};

	const handleFinishSubmit = () => {
		const value = form.getFieldsValue();
		const params = {
			...value,
			birthday: moment(value.birthday).toISOString(),
		};
		const service = callAPI.put(`/users/${resultEdit.id}`, params);
		apiHandler({
			service,
			successMessage: 'update success',
			errorMessage: 'update failed',
			successCallback,
		});
	};

	const handleOkModal = async () => {
		await handleFinishSubmit();
	};

	const handleDelete = (record) => {};

	const handleTableChange = (pagination, _filters, _sorter) => {
		setParams({
			...params,
			pageIndex: pagination.current,
			pageSize: pagination.pageSize,
		});
	};

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			sorter: true,
			width: '20%',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			sorter: true,
			width: '20%',
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button type="primary" onClick={() => handleEdit(record)}>
						Edit
					</Button>
					<Button type="dashed" onClick={() => handleDelete(record)}>
						Delete
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<Input.Search
				allowClear
				style={{ width: '40%' }}
				defaultValue=""
				onSearch={onSearch}
			/>
			<Table
				columns={columns}
				rowKey={(data) => data.id}
				dataSource={userList.data}
				pagination={pagination}
				loading={loading}
				onChange={handleTableChange}
			/>
			<ModalEdit
				title={title}
				isOpen={isModalOpen}
				handleOkModal={handleOkModal}
				handleClose={handleCancel}
			>
				<FormUser
					data={resultEdit}
					form={form}
					handleFinishSubmit={handleFinishSubmit}
				/>
			</ModalEdit>
		</>
	);
}

export default User;
