/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://yutomotohashi.github.io',
  generateRobotsTxt: true,
  trailingSlash: true,
  outDir: './dist',
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};

module.exports = config;
