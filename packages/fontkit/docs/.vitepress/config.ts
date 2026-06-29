import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@pdf-lab/fontkit",
  description: "An advanced font engine for Node and the browser.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'API', link: '/api/' },
    ],

    sidebar: [
			{
				text: 'API',
				items: typedocSidebar,
			}
		],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gflohr/pdf-lab' }
    ]
  }
})
