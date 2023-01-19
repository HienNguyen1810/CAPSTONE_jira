import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input, notification, Row, Select, Space } from 'antd';
import { Drawer } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import {
	deleteProjectApi,
	getProjectDetail,
	getProjectList,
	projectCategory,
	updateProjectDetail,
} from '../../../redux/features/projectSlice';

const { Option } = Select;

export const EditDeleteProject = ({ record }) => {
	const [formInstance] = Form.useForm();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [contentEditor, setContentEditor] = useState('');

	const cateSelector = useSelector(projectCategory);
	const onDeleteProject = (id) => {
		const idUser = JSON.parse(localStorage.getItem('idUser'));
		if (record.creator.id.toString() !== idUser.toString()) {
			notification.error({ message: 'User is unthorization!' });
			return;
		}
		dispatch(deleteProjectApi(id))
			.unwrap()
			.then((originalPromiseResult) => {
				dispatch(getProjectList());
			})
			.catch((error) => {
				notification.error({
					message: error || 'Delete Project failed!',
				});
			});
	};
	const showDrawer = () => {
		const idUser = JSON.parse(localStorage.getItem('idUser'));
		if (record.creator.id.toString() !== idUser.toString()) {
			notification.error({ message: 'User is unthorization!' });
			return;
		}
		setOpen(true);
		dispatch(getProjectDetail(record?.id))
			.unwrap()
			.then((originalPromiseResult) => {
				formInstance.setFieldsValue({
					projectName: originalPromiseResult.projectName,
					categoryId: originalPromiseResult.projectCategory.id,
				});

				setContentEditor(originalPromiseResult.description);
			})
			.catch((error) => {
				notification.error({
					message: error || 'Create Project failed!',
				});
			});
	};
	const onClose = () => {
		setOpen(false);
	};
	const handleEditorChange = (content, editor) => {
		setContentEditor(content);
	};

	const submitForm = () => {
		const value = formInstance.getFieldsValue();
		const params = {
			id: record.id,
			projectName: value.projectName,
			creator: record.creator.id,
			description: contentEditor,
			categoryId: value.categoryId,
		};

		dispatch(updateProjectDetail(params))
			.unwrap()
			.then((originalPromiseResult) => {
				dispatch(getProjectList());
				onClose();
				notification.success({ message: 'Edit Project successfully!' });
			})
			.catch((error) => {
				notification.error({
					message: error || 'Create Project failed!',
				});
			});
	};
	return (
		<>
			<Space size="middle">
				<button
					className="border-2 border-[#0a00b6] p-1 px-5 rounded-md text-[#0a00b6]"
					onClick={showDrawer}
				>
					Edit
				</button>
				<button
					className="border-2 border-[#cc6c3c] p-1 px-5 rounded-md text-[#cc6c3c]"
					onClick={() => onDeleteProject(record.id)}
				>
					Delete
				</button>
			</Space>
			<Drawer
				title="Edit Project"
				width={720}
				onClose={onClose}
				open={open}
				bodyStyle={{
					paddingBottom: 80,
				}}
				extra={
					<Space>
						<button
							className="text-white bg-[#0a00b6] h-18 w-24 justify-center flex items-center text-base font-medium py-2 px-4 rounded-full active:scale-95 transition-all ease-in duration-150"
							onClick={submitForm}
						>
							Submit
						</button>
						<button className="hover:underline" onClick={onClose}>
							Cancel
						</button>
					</Space>
				}
			>
				<Form form={formInstance} layout="vertical">
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item
								name="projectName"
								label="Project Name"
								rules={[
									{
										required: true,
										message: 'Please input your Project Name!',
									},
								]}
							>
								<Input placeholder="input your project title..." />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="categoryId"
								label="Category"
								rules={[
									{
										required: true,
										message: 'Please Select Your Category!',
									},
								]}
							>
								<Select placeholder="Select category for project" allowClear>
									{cateSelector?.map((item, idx) => {
										return (
											<Option key={idx} value={item.id}>
												{item.projectCategoryName}
											</Option>
										);
									})}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Editor
						value={contentEditor}
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
				</Form>
			</Drawer>
		</>
	);
};
