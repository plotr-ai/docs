import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'plotr.ai Docs',
  tagline: 'plotr.ai Docs',
  favicon: '/docs/img/favicon.ico',

  // Set the production url of your site here
  url: 'https://plotr-ai.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'plotr-ai', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/plotr-ai/docs/tree/main/',
          routeBasePath: 'blog',
          path: 'blog',
          blogTitle: 'plotr.ai Blog',
          blogDescription: 'The official plotr.ai blog',
          blogSidebarCount: 5,
          blogSidebarTitle: 'Recent Posts',
          postsPerPage: 5,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: '/docs/img/plotr-social-card.png',
    navbar: {
      title: 'plotr.ai Docs',
      logo: {
        alt: 'plotr.ai Logo',
        src: '/docs/img/logo.svg',
      },
      style: 'dark',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/blog', 
          label: 'Blog',
          position: 'left'
        },
        {
          href: 'https://github.com/plotr-ai/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/plotr-ai/docs/discussions',
            },
            {
              label: 'GitHub Issues',
              href: 'https://github.com/plotr-ai/docs/issues',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/plotr-ai/docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} plotr.ai. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    customCss: ['./src/css/custom.css'],

    // Add mermaid theme configuration
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
      options: {
        maxTextSize: 50000,
        fontFamily: 'system-ui',
      },
    },

    // Add Algolia search configuration
    algolia: {
      // Replace with your own values
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'plotr-docs',
      contextualSearch: true,
      searchParameters: {
        facetFilters: ['language:en'],
      },
    },
  } satisfies Preset.ThemeConfig,

  customFields: {
    colors: {
      primary: '#5DBF94',
      secondary: '#1B2732',
      accent: '#5ab990',
      background: '#ffffff',
      text: '#1B2732',
    },
  },
}

export default config
