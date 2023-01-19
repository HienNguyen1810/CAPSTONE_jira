import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		mkcert(),
		vitePluginImp({
			optimize: true,
			libList: [
				{
					libName: 'antd',
					style: (name) => `antd/es/${name}/style`,
				},
			],
		}),
	],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				// modifyVars: {
				// 	hack: `true; @import "./src/theme.less";`,
				// },
			},
		},
	},
	server: { https: true },
});
