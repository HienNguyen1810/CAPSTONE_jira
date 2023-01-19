import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Divider, Tooltip } from 'antd';
import { Popover } from 'antd';
import { AutoComplete } from 'antd';
import { notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
	assignUser,
	getProjectList,
	removeUserFromProject,
} from '../../../redux/features/projectSlice';
import {
	fetchUserByProjectId,
	getUserSearchKey,
	userList,
} from '../../../redux/features/userSlice';

const AssignUser = ({ members, projectId }) => {
	return (
		<div className="flex items-center gap-3">
			<Avatar.Group
				size="large"
				maxCount={2}
				maxStyle={{
					color: '#f56a00',
					backgroundColor: '#fde3cf',
				}}
			>
				{members.map((item, idx) => {
					return (
						<Popover
							placement="bottom"
							title="Member List"
							content={
								<MemberListPopover members={members} projectId={projectId} />
							}
							trigger="click"
							key={item.userId}
						>
							<Tooltip title={item.name}>
								<Avatar className="cursor-pointer">
									{item.name
										?.match(/\b(\w)/g)
										.slice(0, 2)
										.join('')
										.toUpperCase()}
								</Avatar>
							</Tooltip>
						</Popover>
					);
				})}
			</Avatar.Group>
			<Popover
				title="Assign Member"
				trigger="click"
				content={<MemberListAssign projectId={projectId} />}
			>
				<Avatar
					style={{ display: 'flex', background: '#0a00b6' }}
					className="flex items-center justify-center cursor-pointer"
					icon={<PlusOutlined />}
				/>
			</Popover>
		</div>
	);
};

const MemberListPopover = ({ members, projectId }) => {
	const dispatch = useDispatch();
	const removeUser = (userId) => {
		dispatch(removeUserFromProject({ projectId, userId }))
			.unwrap()
			.then((originalPromiseResult) => {
				dispatch(fetchUserByProjectId(projectId));
				dispatch(getProjectList());
			})
			.catch((error) => {
				notification.error({
					message: error || 'Create Project failed!',
				});
			});
	};
	return members.map((item, idx) => {
		return (
			<div className="flex justify-between items-center mb-4" key={item.userId}>
				<Tooltip
					className="inline-block w-[150px] truncate mr-2"
					title={item.name}
				>
					{item.name}
				</Tooltip>

				<div
					className="w-5 h-5 rounded-full flex items-center justify-center  bg-slate-500 cursor-pointer text-white"
					onClick={() => removeUser(item.userId)}
				>
					x
				</div>
			</div>
		);
	});
};

const MemberListAssign = ({ projectId }) => {
	const dispatch = useDispatch();
	const userListSelector = useSelector(userList);
	const searchRef = useRef(null);
	const handleSearch = (value) => {
		if (searchRef.current) {
			clearTimeout(searchRef.current);
		}
		searchRef.current = setTimeout(() => {
			dispatch(getUserSearchKey(value));
		}, 300);
	};
	const handleSelect = (value, option) => {
		dispatch(assignUser({ projectId, userId: option.userId }))
			.unwrap()
			.then((originalPromiseResult) => {
				dispatch(fetchUserByProjectId(projectId));
				dispatch(getProjectList());
			})
			.catch((error) => {
				notification.error({
					message: error || 'Create Project failed!',
				});
			});
	};

	return (
		<AutoComplete
			style={{
				width: 200,
			}}
			onSearch={handleSearch}
			placeholder="assign here"
			onSelect={handleSelect}
			options={userListSelector?.map((user, index) => {
				return {
					label: user.name,
					value: user.name,
					userId: user.userId,
					key: index,
				};
			})}
		/>
	);
};

export default AssignUser;
