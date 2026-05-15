/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack for production builds if it causes SIGKILL memory issues
  experimental: {
    // Addressing the "optimizePackageImports" mention in the logs
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      'date-fns',
    ],
  },
  // Set output to standalone for better memory management in some environments
  output: 'standalone',
};

export default nextConfig;