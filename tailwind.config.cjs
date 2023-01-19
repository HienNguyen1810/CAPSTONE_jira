/** @type {import('tailwindcss').Config} */
module.exports = {
	content: {
		relative: true,
		files: ['./index.html', './src/**/*.{jsx,js}'],
	},
	darkMode: 'class',
	theme: {
		extend: {},
	},
	corePlugins: {
		preflight: true,
	},
	plugins: [],
};
