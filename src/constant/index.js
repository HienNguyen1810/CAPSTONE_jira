import { Tooltip } from 'antd';

export const getColumns = () => {
	const columns = [
		{
			key: 'id',
			title: 'id',
			dataIndex: 'id',
			width: 80,
			render: (text) => <span>{text}</span>,
		},
		{
			key: 'image',
			title: 'image',
			dataIndex: 'image',
			width: 120,
			render: (img) => <img className="w-[85px] object-cover" src={img} />,
		},
		{
			key: 'name',
			title: 'name',
			dataIndex: 'name',
			ellipsis: {
				showTitle: false,
			},
			render: (namePro) => (
				<Tooltip placement="topLeft" title={namePro}>
					{namePro}
				</Tooltip>
			),
		},
		{
			key: 'price',
			title: 'price',
			dataIndex: 'price',
			width: 120,
		},
		{
			key: 'quantity',
			title: 'quantity',
			dataIndex: 'quantity',
			render: (number, data) => {
				return <p>{number}</p>;
			},
		},
	];
	return columns;
};
