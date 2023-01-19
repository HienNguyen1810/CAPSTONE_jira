import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Input, notification, Row, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { projectCategory } from '../../redux/features/projectSlice';
import { createProject } from '../../redux/features/projectSlice';

const { Option } = Select;

const CreateProject = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [contentEditor, setContentEditor] = useState('');
	const handleEditorChange = (content, _editor) => {
		setContentEditor(content);
	};
	const cateSelector = useSelector(projectCategory);
	const submitForm = (value) => {
		dispatch(createProject({ ...value, description: contentEditor }))
			.unwrap()
			.then((_originalPromiseResult) => {
				notification.success({ message: 'Create Project successfully!' });
				navigate('/', { replace: true });
			})
			.catch((error) => {
				notification.error({
					message: error || 'Create Project failed!',
				});
			});
	};
	return (
		<div className="p-3">
			<h3 className="text-[30px] text-[#651fff] font-bold">
				ADD PROJECT-DETAIL
			</h3>
			<p className="text-slate-400  mb-6 mt-[-5px] text-sm">
				you can change these details anytime in your project settings
			</p>
			<Form onFinish={submitForm} layout="vertical">
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
				<button className="text-white bg-[#0a00b6] h-18 w-32 justify-center flex items-center text-base font-medium py-3 px-7 rounded-full active:scale-95 transition-all ease-in duration-150 mt-6 hover:border-[#0a00b6] hover:bg-white hover:text-[#0a00b6] border-2">
					Create
				</button>
			</Form>
		</div>
	);
};

export default CreateProject;
