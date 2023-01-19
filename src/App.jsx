import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './pages/AppLayout';
import CheckLogin from './pages/CheckLogin';
import ProtectedRoute from './pages/ProtectedRoute';
import './styles/app.less';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CreateProject = lazy(() => import('./pages/CreateProject'));
const ProjectManagement = lazy(() => import('./pages/ProjectManagement'));

function App() {
	return (
		<Routes>
			<Route element={<CheckLogin />}>
				<Route path="login" element={<Login />} />
			</Route>

			<Route element={<CheckLogin />}>
				<Route path="register" element={<Register />} />
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<AppLayout />}>
					<Route path="project-detail/:id" element={<Home />} />
				</Route>
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<AppLayout />}>
					<Route path="create-project" element={<CreateProject />} />
				</Route>
			</Route>
			
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<ProjectManagement />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
