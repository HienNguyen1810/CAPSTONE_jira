import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

const TaskList = ({ lstTaskDeTail, index }) => {
	return (
		<div className="flex flex-col gap-4 items-stretch overflow-y-auto h-[400px] pr-4">
			{lstTaskDeTail?.map((item, idx) => {
				return (
					<Draggable
						key={item?.taskId?.toString()}
						draggableId={item?.taskId?.toString()}
						index={idx}
					>
						{(provided, snapshot) => (
							<div
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}
							>
								<TaskItem item={item} />
								{provided.placeholder}
							</div>
						)}
					</Draggable>
				);
			})}
		</div>
	);
};

export default TaskList;
