/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All imagery is served from /public. Add a remote pattern here only when
    // a real external source is introduced.
    unoptimized: false
  }
};

export default nextConfig;
