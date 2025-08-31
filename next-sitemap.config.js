/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://yutomotohashi.github.io',
  generateRobotsTxt: false,
  // Ensure the static summary page is included in the sitemap
  additionalPaths: async (config) => [
    await config.transform(config, '/static_summary.html'),
  ],
};

module.exports = config;
  