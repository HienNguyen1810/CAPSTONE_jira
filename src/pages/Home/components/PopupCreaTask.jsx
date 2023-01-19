import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Col,
	Drawer,
	Form,
	Input,
	InputNumber,
	notification,
	Row,
	Select,
} from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import {
	createTask,
	getProjectDetail,
	setProjectDetail,
	taskPriority,
	taskStatus,
	taskType,
} from '../../../redux/features/projectSlice';

const { Option } = Select;

export const PopupCreaTask = ({ projectDetailSelector }) => {
	const [formInstant] = Form.useForm();

	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState('right');
	const [contentEditor, setContentEditor] = useState('');

	const taskTypeSelector = useSelector(taskType);
	const taskPrioritySelector = useSelector(taskPriority);
	const taskStatusSelector = useSelector(taskStatus);

	const dispatch = useDispatch();

	const showDrawer = () => {
		formInstant.setFieldsValue({
			projectName: projectDetailSelector?.projectName,
		});
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const handleEditorChange = (content, editor) => {
		setContentEditor(content);
	};

	const submitForm = (value) => {
		const { projectName, ...restFormValue } = value;
		const params = {
			...restFormValue,
			projectId: projectDetailSelector.id,
			description: contentEditor,
		};
		dispatch(createTask(params))
			.unwrap()
			.then((originalPromiseResult) => {
				notification.success({ message: 'Create Task successfully!' });
				dispatch(getProjectDetail(projectDetailSelector.id))
					.unwrap()
					.then((originalPromiseResult) => {
						dispatch(setProjectDetail(originalPromiseResult));
						setOpen(false);
						formInstant.resetFields();
					})
					.catch((error) => {});
			})
			.catch((error) => {
				notification.error({
					message: error || 'Create Project failed!',
				});
			});
	};
	return (
		<>
			<button
				className="text-white bg-[#0a00b6] h-18 w-40 justify-center flex items-center text-base font-medium py-3 px-7 rounded-full active:scale-95 transition-all ease-in duration-150 ml-auto"
				onClick={showDrawer}
			>
				Create Task
			</button>
			<Drawer
				title="Create task"
				placement={placement}
				width={800}
				onClose={onClose}
				open={open}
			>
				<div>
					<Form onFinish={submitForm} layout="vertical" form={formInstant}>
						<Row gutter={[16, 4]}>
							<Col span={12}>
								<Form.Item label="Project Name" name="projectName">
									<Input readOnly />
								</Form.Item>
							</Col>
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
									<Select
										placeholder="Select select status for project"
										allowClear
									>
										{taskStatusSelector?.map((item, idx) => {
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
										{taskPrioritySelector?.map((item, idx) => {
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
										{taskTypeSelector?.map((item, idx) => {
											return (
												<Option key={item.id} value={item.id}>
													{item.taskType}
												</Option>
											);
										})}
									</Select>
								</Form.Item>
							</Col>
							<Col span={24}>
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
										{projectDetailSelector?.members?.map((item, idx) => {
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
									<InputNumber style={{ width: '100%' }} />
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
									name="description"
									init={{
										height: 300,
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
						<button className="text-white bg-[#0a00b6] h-18 w-32 justify-center flex items-center text-base font-medium py-3 px-7 rounded-full active:scale-95 transition-all ease-in duration-150 mt-6">
							Submit
						</button>
					</Form>
				</div>
			</Drawer>
		</>
	);
};
