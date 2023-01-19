import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Tag } from 'antd';
import { projectListMapping } from '../../../redux/features/projectSlice';
import AssignUser from './AssignUser';
import { EditDeleteProject } from './EditDeleteProject';
import LinkProjectDetail from './LinkProjectDetail';

export const ProjectManagementTable = () => {
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
