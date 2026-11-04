const nextConfig = {
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  images: {
    unoptimized: !!process.env.STATIC_EXPORT,
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig 
