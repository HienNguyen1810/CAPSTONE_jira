import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { RiDashboard3Line } from 'react-icons/ri';
import { SiGoogletagmanager } from 'react-icons/si';
import { NavLink } from 'react-router-dom';

const activeStyle = {
	textDecoration: 'underline',
	color: '#40a9ff',
	borderRight: '3px solid #40a9ff',
	backgroundColor: '#40a9ff14',
};
const SidebarLeft = () => {
	return (
		<div className="pt-4">
			<div className="pl-4">
				<img src="/jira.png" alt="jira" className="w-28 object-cover" />
			</div>

			<div>
				{/* <NavLink
					to="/"
					className="pl-4 flex items-center gap-3 py-4"
					style={({ isActive }) => (isActive ? activeStyle : undefined)}
				>
					<RiDashboard3Line size={20} />
					<span className="font-semibold">Dashboard</span>
				</NavLink> */}
				<NavLink
					to="/"
					className="pl-4 flex items-center gap-3 py-4"
					style={({ isActive }) => (isActive ? activeStyle : undefined)}
				>
					<SiGoogletagmanager size={20} />
					<span className="font-semibold">Project Management</span>
				</NavLink>
				<NavLink
					to="/create-project"
					className="pl-4 flex items-center gap-3 py-4"
					style={({ isActive }) => (isActive ? activeStyle : undefined)}
				>
					<IoCreateOutline size={20} />
					<span className="font-semibold">Create Project</span>
				</NavLink>
			</div>
		</div>
	);
};

export default SidebarLeft;
