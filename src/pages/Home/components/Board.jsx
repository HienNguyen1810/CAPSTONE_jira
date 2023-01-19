import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import { cloneDeep } from 'lodash';
import {
	getProjectDetail,
	setProjectDetail,
	updateStatus,
} from '../../../redux/features/projectSlice';
import './board.less';
import TaskList from './TaskList';

const Board = ({ projectDetailSelector }) => {
	const dispatch = useDispatch();
	const onDragEnd = (value) => {
		const { destination, source, draggableId } = value;

		const newProjectDetail = cloneDeep(projectDetailSelector);
		if (
			(destination?.droppableId === source.droppableId &&
				destination.index === source.index) ||
			!destination
		)
			return;
		if (destination.droppableId === source.droppableId) {
			let [boardInfo] = newProjectDetail?.lstTask.filter(
				(item) => item.statusId === source.droppableId
			);
			let taskListRedoer = boardInfo.lstTaskDeTail;
			let [reoderItem] = taskListRedoer.splice(source.index, 1);
			taskListRedoer.splice(destination.index, 0, reoderItem);
			dispatch(setProjectDetail(newProjectDetail));
		}
		if (destination.droppableId !== source.droppableId) {
			const indexSourceColumn = newProjectDetail?.lstTask.findIndex(
				(item) => item.statusId === source.droppableId
			);
			const indexDesColumn = newProjectDetail?.lstTask.findIndex(
				(item) => item.statusId === destination.droppableId
			);
			const boardSourceInfo = newProjectDetail?.lstTask[indexSourceColumn];
			const boardDesInfo = newProjectDetail?.lstTask[indexDesColumn];

			let [reoderItem] = boardSourceInfo.lstTaskDeTail.splice(source.index, 1);
			boardDesInfo.lstTaskDeTail.splice(destination.index, 1, reoderItem);
			dispatch(setProjectDetail(newProjectDetail));

			const value = {
				taskId: Number(draggableId),
				statusId: destination.droppableId,
			};

			dispatch(updateStatus(value))
				.unwrap()
				.then((originalPromiseResult) => {
					dispatch(getProjectDetail(projectDetailSelector.id))
						.unwrap()
						.then((originalPromiseResult) => {
							dispatch(setProjectDetail(originalPromiseResult));
						})
						.catch((error) => {
							notification.error({
								message: error || 'Edit Project failed!',
							});
						});
				})
				.catch((error) => {
					notification.error({
						message: error || 'Edit Project failed!',
					});
				});
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="board grid grid-cols-4 gap-8 mx-">
				{projectDetailSelector?.lstTask?.map((item, idx) => {
					return (
						<div
							className="board-item pl-4 pb-4 shadow-md bg-[#e4e4e4]"
							key={item.statusId}
						>
							<h3 className="my-4 font-semibold">{item.statusName}</h3>
							<Droppable droppableId={item?.statusId}>
								{(provided, snapshot) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										<TaskList lstTaskDeTail={item?.lstTaskDeTail} index={idx} />
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					);
				})}
			</div>
		</DragDropContext>
	);
};

export default Board;
