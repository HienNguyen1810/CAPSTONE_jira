import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoadingPage from './../../components/LoadingPage';
import { getProjectCategory } from '../../redux/features/projectSlice';
import { Header } from './Header';
import SidebarLeft from './SidebarLeft';

export const AppLayout = (_props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProjectCategory());
	}, []);
	return (
		<div className="grid grid-cols-12 grid-rows-[60px_auto] gap-2 grid-flow-col">
			<div className="col-span-2 row-span-3 h-[100vh] relative">
				<SidebarLeft />
			</div>
			<div className="col-span-10 ">
				<Header />
			</div>
			<div className="col-span-10">
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
			</div>
		</div>
	);
};
