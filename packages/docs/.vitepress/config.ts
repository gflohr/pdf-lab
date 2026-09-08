import { defineConfig } from 'vitepress'
import fontkitTypedocSidebar from '../fontkit/api/typedoc-sidebar.json';
import coreTypedocSidebar from '../pdfa-lab-core/api/typedoc-sidebar.json';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "@pdfa-lab",
	base: "/pdfa-lab/",
	description: "High-quality PDF tools for Node and the Browser",
	// FIXME! This seems to be a bug in the TypeDoc Markdown plug-in.
	ignoreDeadLinks: true,
	markdown: {
		config(md) {
			md.use(tabsMarkdownPlugin)
		},
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
		],

		sidebar: [
			{
				text: 'pdfa-lab (CLI)',
				link: '/cli/about-pdfa-lab',
				items: [
					{
						text: 'About pdfa-lab',
						collapsed: true,
						link: '/cli/about-pdfa-lab',
					},
					{
						text: 'Installation',
						collapsed: true,
						link: '/cli/installation',
					},
					{
						text: 'Convert to PDF/A',
						collapsed: true,
						link: '/cli/convert-to-pdfa',
					},
					{
						text: 'Embed or List Fonts',
						collapsed: true,
						link: '/cli/list-or-embed-fonts',
					},
					{
						text: 'Extract Text',
						collapsed: true,
						link: '/cli/extract-text',
					},
					{
						text: 'Extract XMP Meta Information',
						collapsed: true,
						link: '/cli/extract-xmp',
					}
				],
			},
			{
				text: '@pdfa-lab/core',
				link: '/pdfa-lab-core/introduction/about-pdfa-lab',
				items: [
					{
						text: 'Introduction',
						collapsed: true,
						items: [
							{
								text: 'About @pdfa-lab/core',
								link: '/pdfa-lab-core/introduction/about-pdfa-lab',
							},
							{
								text: 'Installation',
								link: '/pdfa-lab-core/introduction/installation',
							},
							{
								text: 'Basic Usage',
								link: '/pdfa-lab-core/introduction/basic-usage',
							},
						],
					},
					{
						text: 'Examples',
						collapsed: true,
						items: [
							{
								text: 'Embedding Fonts',
								link: '/pdfa-lab-core/examples/embed-fonts',
							},
							{
								text: 'Extracting Text',
								link: '/pdfa-lab-core/examples/extract-text',
							},
							{
								text: 'Extracting XMP Meta Information',
								link: '/pdfa-lab-core/examples/extract-xmp',
							},
							{
								text: 'Listing Fonts',
								link: '/pdfa-lab-core/examples/list-fonts',
							},
						],
					},
					{
						text: 'API',
						items: coreTypedocSidebar,
					},
				],
			},
			{
				text: '@pdfa-lab/fontkit',
				link: '/fontkit',
				items: [
					{
						text: 'Introduction',
						collapsed: true,
						items: [
							{
								text: 'What is fontkit?',
								link: '/fontkit/introduction/what-is-fontkit'
							},
							{
								text: 'Installation',
								link: '/fontkit/introduction/installation',
							},
							{
								text: 'Basic Usage',
								link: '/fontkit/introduction/basic-usage',
							},
							{
								text: 'Security',
								link: '/fontkit/introduction/security',
							},
						],
					},
					{
						text: 'Examples',
						collapsed: true,
						items: [
							{
								text: 'Inspecting & Querying Metrics',
								link: '/fontkit/examples/inspecting-and-querying-metrics',
							},
							{
								text: 'Text Layout & Glyph Run Measurement',
								link: '/fontkit/examples/text-layout-and-glyph-run-measurement',
							},
							{
								text: 'Glyph Outline & Path Operations',
								link: '/fontkit/examples/glyph-outlines-and-path-operations',
							},
							{
								text: 'Subsetting',
								link: '/fontkit/examples/subsetting',
							},
							{
								text: 'Font Collections',
								link: '/fontkit/examples/font-collections',
							},
							{
								text: 'Legacy API',
								link: '/fontkit/examples/legacy-api',
							},
						],
					},
					{
						text: 'Tables',
						collapsed: true,
						link: '/fontkit/tables',
						items: [
							{
								text: 'Naming Conventions',
								link: '/fontkit/tables/naming-conventions'
							},
							{
								text: 'Font Type Narrowing',
								link: '/fontkit/tables/font-type-narrowing',
							},
							{
								text: 'Versioned Structures',
								link: '/fontkit/tables/versioned-structures',
							},
						],
					},
					{
						text: 'Differences to Other Fontkit Versions',
						link: '/fontkit/differences-to-other-fontkit-versions',
					},
					{
						text: 'API',
						items: fontkitTypedocSidebar,
					},
				]
			}
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/gflohr/pdfa-lab' }
		]
	}
});
