import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar } from 'antd';
import { Tooltip } from 'antd';
import Board from './components/Board';
import { PopupCreaTask } from './components/PopupCreaTask';
import {
	getAllPriority,
	getAllStatus,
	getProjectDetail,
	getTaskType,
	projectDetail,
	setProjectDetail,
} from '../../redux/features/projectSlice';

const Home = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const projectDetailSelector = useSelector(projectDetail);

	useEffect(() => {
		dispatch(getAllStatus());
		dispatch(getAllPriority());
		dispatch(getTaskType());
		dispatch(getProjectDetail(id))
			.unwrap()
			.then((originalPromiseResult) => {
				dispatch(setProjectDetail(originalPromiseResult));
			})
			.catch((_error) => {});
	}, [id]);
	return (
		<>
			<section className="p-3">
				<h1 className="text-[30px] text-[#651fff] font-bold">
					{projectDetailSelector?.projectName}
				</h1>
				<div className="flex items-center justify-between my-6">
					<div>
						<Avatar.Group
							size="large"
							maxCount={2}
							maxStyle={{
								color: '#f56a00',
								backgroundColor: '#fde3cf',
							}}
						>
							{projectDetailSelector?.members?.map((item, idx) => {
								return (
									<Tooltip title={item.name} key={idx}>
										<Avatar className="cursor-pointer">
											{item.name
												?.match(/\b(\w)/g)
												.slice(0, 2)
												.join('')
												.toUpperCase()}
										</Avatar>
									</Tooltip>
								);
							})}
						</Avatar.Group>
					</div>
					<PopupCreaTask projectDetailSelector={projectDetailSelector} />
				</div>
				<Board projectDetailSelector={projectDetailSelector} />
			</section>
		</>
	);
};

export default Home;
