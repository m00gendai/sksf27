/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cms.sksf27.ch',
            port: '',
            pathname: '/storage/uploads/**',
          },
          {
            protocol: "https",
            hostname: "scontent.*.fna.fbcdn.net",
            pathname: "/**"
          },
          {
            protocol: "https",
            hostname: "external.*.fna.fbcdn.net",
            pathname: "/**"
          }
        ],
      },
      i18n: {
        locales: ["de_CH"],
        defaultLocale: "de_CH",
      }
};

export default nextConfig;
