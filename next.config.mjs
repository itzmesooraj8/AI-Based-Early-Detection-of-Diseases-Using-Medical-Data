/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/analyze',
        destination: 'http://127.0.0.1:5000/analyze',
      },
      {
        source: '/api/health',
        destination: 'http://127.0.0.1:5000/health',
      },
    ]
  },
}

export default nextConfig
