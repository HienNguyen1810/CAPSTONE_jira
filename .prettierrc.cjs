module.exports = {
	singleQuote: true,
	plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
	importOrder: ['^vite', '^react', '^antd', '<THIRD_PARTY_MODULES>', 'components/', 'pages/', 'hooks/', 'contexts/', 'utils/', '^[./]'],
	importOrderSortSpecifiers: true,
	importOrderGroupNamespaceSpecifiers: true,
	importOrderCaseInsensitive: true,
	tabWidth: 2,
	useTabs: true,
};
