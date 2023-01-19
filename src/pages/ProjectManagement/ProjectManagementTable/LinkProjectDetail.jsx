import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

const LinkProjectDetail = ({ value }) => {
	const navigate = useNavigate();
	const redirectDetailProject = () => {
		const idUser = JSON.parse(localStorage.getItem('idUser'));
		if (value.members?.length === 0) {
			notification.warning({ message: 'Please assign usser!' });
			return;
		}
		const userIdList = value.members.map((item) => item.userId.toString());
		if (value.creator.id.toString() === idUser.toString()) {
			navigate(`/project-detail/${value.id}`);
		} else {
			if (!userIdList.includes(idUser.toString())) {
				notification.error({ message: 'User is unthorization!' });
				return;
			} else {
				navigate(`/project-detail/${value.id}`);
			}
		}
	};
	return (
		<button className="hover:text-[#40a9ff]" onClick={redirectDetailProject}>
			<span className="font-medium">{value?.projectName}</span>
		</button>
	);
};

export default LinkProjectDetail;
