import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { notification } from 'antd';
import useAuth from '../hooks/use-auth';
import EventBus from '../utils/EventBus';

const ProtectedRoute = () => {
	const { auth, setAuth } = useAuth();
	const location = useLocation();
	const dispatch = useDispatch();

	const token = localStorage.getItem('token');
	const email = localStorage.getItem('email');
	const logOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		setAuth('');
	};
	useEffect(() => {
		EventBus.on('logout', () => {
			notification.warning({
				message: 'Your session is expired, please login and try again!',
			});
		});
		return () => {
			EventBus.remove('logout');
		};
	}, []);
	return auth?.email || (JSON.parse(token) && JSON.parse(email)) ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
