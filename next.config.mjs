/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: { unoptimized: true },
    output: 'export',
    trailingSlash: true,
    distDir: 'dist',
};

export default nextConfig;
