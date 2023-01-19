import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProjectList } from '../../redux/features/projectSlice';
import { ProjectManagementTable } from './ProjectManagementTable';

const ProjectManagement = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProjectList());
	}, []);
	return (
		<div className="p-3">
			<ProjectManagementTable />
		</div>
	);
};

export default ProjectManagement;
