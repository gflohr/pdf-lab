import { defineConfig } from 'vitepress';
import typedocSidebar from '../api/typedoc-sidebar.json';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: '@pdf-lab/fontkit',
	markdown: {
		config(md) {
			md.use(tabsMarkdownPlugin);
		}
	},
	description: 'An advanced font engine for Node and the browser.',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'API', link: '/api/' },
		],

		sidebar: [
			{
				text: 'Introduction',
				items: [
					{
						text: 'What is Fontkit?',
						link: '/introduction/what-is-fontkit'
					},
					{
						text: 'Installation',
						link: '/introduction/installation'
					},
					{
						text: 'Basic Usage',
						link: '/introduction/basic-usage'
					}
				],
			},
			{
				text: 'API',
				items: typedocSidebar,
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/gflohr/pdf-lab' },
		],
	},
});
