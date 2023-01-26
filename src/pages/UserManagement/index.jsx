import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserSearchKey } from '../../redux/features/userSlice';
import { UserManagementTable } from './UserManagementTable';

const UserManagement = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserSearchKey());
	}, []);
	return (
		<div className="p-3">
			<UserManagementTable />
		</div>
	);
};

export default UserManagement;
