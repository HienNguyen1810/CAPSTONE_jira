import React from 'react';
import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Col,
	Form,
	Input,
	InputNumber,
	Modal,
	notification,
	Row,
	Select,
	Tooltip,
} from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import {
	getProjectDetail,
	getTaskDetail,
	projectDetail,
	removeTask,
	setProjectDetail,
	taskPriority,
	taskStatus,
	taskType,
	updateTask,
} from '../../../redux/features/projectSlice';

const { Option } = Select;

const TaskItem = (props) => {
	const { item } = props;
	const [formInstant] = Form.useForm();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [contentEditor, setContentEditor] = useState('');

	const taskTypeSelector = useSelector(taskType);
	const taskPrioritySelector = useSelector(taskPriority);
	const taskStatusSelector = useSelector(taskStatus);
	const projectDetailSelector = useSelector(projectDetail);

	const timeSpentWatching = Form.useWatch('timeTrackingSpent', formInstant);
	const timeOriginWatching = Form.useWatch('originalEstimate', formInstant);

	const dispatch = useDispatch();
	const deleteTask = (e) => {
		e.stopPropagation();
		dispatch(removeTask(item?.taskId))
			.unwrap()
			.then((_originalPromiseResult) => {
				notification.success({ message: 'Remove Task successfully!' });
				dispatch(getProjectDetail(item.projectId))
					.unwrap()
					.then((originalPromiseResult) => {
						dispatch(setProjectDetail(originalPromiseResult));
					})
					.catch((_error) => {});
			})
			.catch((error) => {
				notification.error({
					message: error || 'Remove Project failed!',
				});
			});
	};

	const showModal = (id) => {
		dispatch(getTaskDetail(id))
			.unwrap()
			.then((originalPromiseResult) => {
				const assignessMapping = originalPromiseResult.assigness?.map(
					(item) => item.id
				);
				const value = {
					...originalPromiseResult,
					listUserAsign: assignessMapping,
				};
				formInstant.setFieldsValue(value);
				setContentEditor(originalPromiseResult.description);
			})
			.catch((error) => {
				notification.error({
					message: error || 'Create Project failed!',
				});
			});
		setIsModalOpen(true);
	};
	const handleOk = () => {
		const value = formInstant.getFieldsValue();
		if (timeOriginWatching - timeSpentWatching <= 0) {
			notification.error({
				message: 'Please input time tracking spent less than time origin!',
			});
			return;
		}
		if (timeSpentWatching === 0) {
			notification.error({
				message: 'Time tracking spent not less than 0!',
			});
			return;
		}
		const mappingValue = {
			...value,
			projectId: projectDetailSelector.id,
			description: contentEditor,
			taskId: item?.taskId,
		};

		dispatch(updateTask(mappingValue))
			.unwrap()
			.then((_originalPromiseResult) => {
				// dispatch(getTaskDetail(item?.taskId));
				dispatch(getProjectDetail(projectDetailSelector.id))
					.unwrap()
					.then((originalPromiseResult) => {
						notification.success({ message: 'Edit Task successfully!' });
						dispatch(setProjectDetail(originalPromiseResult));
					})
					.catch((error) => {
						notification.error({
							message: error || 'Edit Task failed!',
						});
					});

				setIsModalOpen(false);
			})
			.catch((error) => {
				notification.error({
					message: error || 'Edit Task failed!',
				});
			});
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleEditorChange = (content, _editor) => {
		setContentEditor(content);
	};
	const changeTimeSpent = (value) => {
		if (value === 0) {
			notification.error({
				message: 'Time tracking spent not less than 0!',
			});
			return;
		}
		if (timeOriginWatching - value <= 0) {
			notification.error({
				message: 'Please input time tracking spent less than time origin!',
			});
			return;
		}
		const timeRemaining = timeOriginWatching - value;

		formInstant.setFieldsValue({ timeTrackingRemaining: timeRemaining });
	};
	return (
		<>
			<div
				className="w-full h-[100px] bg-slate-500 cursor-pointer flex-shrink-0 p-2 flex flex-col justify-between"
				onClick={() => showModal(item?.taskId)}
			>
				<div className="flex items-center justify-between">
					<p className="text-white font-semibold">{item.taskName}</p>
					<div
						className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center"
						onClick={(e) => deleteTask(e)}
					>
						<BiTrash size={10} color="#ffffff" />
					</div>
				</div>
				<div className="flex items-end justify-between">
					<p className="text-white font-semibold">
						{item.priorityTask.priority}
					</p>
					<Avatar.Group
						size="small"
						maxCount={2}
						maxStyle={{
							color: '#f56a00',
							backgroundColor: '#fde3cf',
						}}
					>
						{item?.assigness?.map((item, idx) => {
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
			</div>
			<Modal
				className="modal-edit-task"
				title="Edit Task"
				open={isModalOpen}
				onCancel={handleCancel}
				bodyStyle={{
					height: '450px',
					overflow: 'auto',
				}}
				footer={[
					<button
						key="submit"
						className="text-white bg-[#0a00b6] h-18 w-24 justify-center flex items-center text-xs font-medium py-2 px-0 rounded-full active:scale-95 transition-all ease-in duration-150 mt-6"
						onClick={handleOk}
					>
						Submit
					</button>,
				]}
			>
				<Form layout="vertical" form={formInstant}>
					<Row gutter={[16, 4]}>
						<Col span={12}>
							<Form.Item
								label="Task Name"
								name="taskName"
								rules={[
									{
										required: true,
										message: 'Please input your task name!',
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Assignees"
								name="listUserAsign"
								rules={[
									{
										required: true,
										message: 'Please assign user!',
									},
								]}
							>
								<Select
									mode="multiple"
									placeholder="Select task type for project"
									allowClear
								>
									{projectDetailSelector.members?.map((item, _idx) => {
										return (
											<Option key={item.userId} value={item.userId}>
												{item.name}
											</Option>
										);
									})}
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Status"
								name="statusId"
								rules={[
									{
										required: true,
										message: 'Please input your status!',
									},
								]}
							>
								<Select placeholder="Select task status for project" allowClear>
									{taskStatusSelector?.map((item, _idx) => {
										return (
											<Option key={item.statusId} value={item.statusId}>
												{item.statusName}
											</Option>
										);
									})}
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Priority"
								name="priorityId"
								rules={[
									{
										required: true,
										message: 'Please select your priority!',
									},
								]}
							>
								<Select placeholder="Select Priority for project" allowClear>
									{taskPrioritySelector?.map((item, _idx) => {
										return (
											<Option key={item.priorityId} value={item.priorityId}>
												{item.priority}
											</Option>
										);
									})}
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Task Type"
								name="typeId"
								rules={[
									{
										required: true,
										message: 'Please select your task type!',
									},
								]}
							>
								<Select placeholder="Select task type for project" allowClear>
									{taskTypeSelector?.map((item, _idx) => {
										return (
											<Option key={item.id} value={item.id}>
												{item.taskType}
											</Option>
										);
									})}
								</Select>
							</Form.Item>
						</Col>

						<Col span={8}>
							<Form.Item
								label="Original Estimate"
								name="originalEstimate"
								rules={[
									{
										required: true,
										message: 'Please estimate your project!',
									},
								]}
							>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Time spent"
								name="timeTrackingSpent"
								rules={[
									{
										required: true,
										message: 'Please input time spent!',
									},
								]}
							>
								<InputNumber
									style={{ width: '100%' }}
									onChange={changeTimeSpent}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Time remaining"
								name="timeTrackingRemaining"
								rules={[
									{
										required: true,
										message: 'Please input time remaining!',
									},
								]}
							>
								<InputNumber style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Editor
								value={contentEditor}
								name="description"
								init={{
									height: 200,
									menubar: false,
									plugins: [
										'advlist autolink lists link image charmap print preview anchor',
										'searchreplace visualblocks code fullscreen',
										'insertdatetime media table paste code help wordcount',
									],
									toolbar:
										'undo redo | formatselect | ' +
										'bold italic backcolor | alignleft aligncenter ' +
										'alignright alignjustify | bullist numlist outdent indent | ' +
										'removeformat | help',
									content_style:
										'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
								}}
								onEditorChange={handleEditorChange}
							/>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};

export default TaskItem;
