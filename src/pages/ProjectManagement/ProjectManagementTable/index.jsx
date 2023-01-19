import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Tag } from 'antd';
import { Space } from 'antd';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
	getProjectList,
	projectListMapping,
} from '../../../redux/features/projectSlice';
import AssignUser from './AssignUser';
import { EditDeleteProject } from './EditDeleteProject';
import './index.less';
import LinkProjectDetail from './LinkProjectDetail';

export const ProjectManagementTable = () => {
	const searchInput = useRef(null);
	const dispatch = useDispatch();
	const handleSearch = (selectedKeys) => {
		dispatch(getProjectList(selectedKeys));
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
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Project Name',
			dataIndex: 'projectName',
			key: 'projectName',
			render: (_, value) => <LinkProjectDetail value={value} />,
			...getColumnSearchProps('name'),
		},
		{
			title: 'Creator',
			dataIndex: 'creator',
			key: 'creator',
			render: (_, value) => (
				<Tag color="green" key={value?.creator?.id}>
					{value?.creator?.name || 'No Creator'}
				</Tag>
			),
		},
		{
			title: 'Member',
			dataIndex: 'members',
			key: 'members',
			render: (_, value) => (
				<AssignUser projectId={value.id} members={value.members} />
			),
		},
		{
			title: 'Category Name',
			dataIndex: 'categoryName',
			key: 'categoryName',
			filters: [
				{
					text: 'Dự án phần mềm',
					value: 'Dự án phần mềm',
				},
				{
					text: 'Dự án web',
					value: 'Dự án web',
				},
				{
					text: 'Dự án di động',
					value: 'Dự án di động',
				},
			],
			onFilter: (value, record) => record.categoryName.startsWith(value),
			filterSearch: true,
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => <EditDeleteProject record={record} />,
		},
	];
	const projectListMappingSelector = useSelector(projectListMapping);

	return (
		<div>
			<Table columns={columns} dataSource={projectListMappingSelector} />
		</div>
	);
};
