import React, { lazy, Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';

const CheckLogin = () => {
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const email = JSON.parse(localStorage.getItem('email'));
	const token = JSON.parse(localStorage.getItem('token'));

	return !email || !token ? (
		<Suspense
			fallback={
				<div
					className="w-full h-full flex items-center justify-center"
					style={{ height: '100vh' }}
				>
					<LoadingPage />
				</div>
			}
		>
			<Outlet />
		</Suspense>
	) : (
		<Navigate to={from} />
	);
};

export default CheckLogin;
