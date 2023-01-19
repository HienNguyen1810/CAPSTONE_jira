import React, { useEffect } from 'react';
import { BiUser } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { Popover, Tooltip } from 'antd';
import useAuth from '../../hooks/use-auth';
import EventBus from '../../utils/EventBus';

const activeStyle = {
	textDecoration: 'underline',
	color: '#1890ff',
};
const ActionButton = () => {
	const { setAuth } = useAuth();

	const email = JSON.parse(localStorage.getItem('email'));
	const token = JSON.parse(localStorage.getItem('token'));

	const isLogin = email && token ? true : false;

	const text = (
		<p className="truncate w-[200px]">
			<Tooltip title={email && email}>{email && email}</Tooltip>
		</p>
	);

	const logOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		localStorage.removeItem('idUser');

		setAuth('');
	};
	useEffect(() => {
		EventBus.on('logout', () => {
			logOut();
		});
		return () => {
			EventBus.remove('logout');
		};
	}, []);
	const content = (
		<div className="flex flex-col">
			<button
				className="w-full py-2 text-left hover:text-[#1890ff]"
				onClick={logOut}
			>
				Logout
			</button>
		</div>
	);
	return (
		<>
			{isLogin ? (
				<div className="flex items-center gap-3">
					<Popover
						placement="bottomRight"
						title={text}
						content={content}
						trigger="click"
						className="truncate"
					>
						<div className="text-white cursor-pointer w-8 h-8 rounded-full bg-[#f3a24c] flex items-center justify-center">
							<BiUser size={24} />
						</div>
					</Popover>
					<p className="truncate w-[150px] font-medium">
						<Tooltip title={email && email}>{email && email}</Tooltip>
					</p>
				</div>
			) : (
				<div className="flex items-center justify-between gap-6 mr-3">
					<NavLink
						to="login"
						className="hover:underline transition-all duration-150 ease-out active:scale-75 text-[#333] font-semibold"
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Login
					</NavLink>
					<NavLink
						to="register"
						className="hover:underline transition-all duration-150 ease-out active:scale-75 text-[#333] font-semibold"
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Register
					</NavLink>
				</div>
			)}
		</>
	);
};

export default ActionButton;
