import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import { Space } from 'antd';
import { Input } from 'antd';
import { Image } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
	getUserSearchKey,
	userListMapping,
} from '../../../redux/features/userSlice';
import { EditDeleteUser } from './EditDeleteUser';
import './index.less';

export const UserManagementTable = () => {
	const searchInput = useRef(null);
	const dispatch = useDispatch();
	const handleSearch = (selectedKeys) => {
		dispatch(getUserSearchKey(selectedKeys));
	};

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? e.target.value : '')
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						style={{ background: '#1890ff', width: 90, color: 'white' }}
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
					>
						Search
					</Button>

					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1890ff' : undefined,
				}}
			/>
		),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
	});

	const columns = [
		{
			title: 'userId',
			dataIndex: 'userId',
			key: 'userId',
		},
		{
			title: 'avatar',
			dataIndex: 'avatar',
			key: 'avatar',
			width: '10%',
			render: (value, _) => <Image src={value} />,
		},
		{
			title: 'name',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
		},
		{
			title: 'email',
			dataIndex: 'email',
			key: 'email',
			...getColumnSearchProps('email'),
		},
		{
			title: 'phoneNumber',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			...getColumnSearchProps('phoneNumber'),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => <EditDeleteUser record={record} />,
		},
	];
	const userListMappingSelector = useSelector(userListMapping);

	return (
		<div>
			<Table columns={columns} dataSource={userListMappingSelector} />
		</div>
	);
};
