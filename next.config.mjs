/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            { source: '/informationen/festzentrum', destination: '/schiessen/festzentrum', permanent: true },
            { source: '/informationen/termine', destination: '/schiessen/programm', permanent: true },
            { source: '/informationen/organisation', destination: '/ueber-uns/organisation', permanent: true },
            { source: '/kontakt', destination: '/ueber-uns/kontakt', permanent: true },
        ];
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cms.sksf27.ch',
            port: '',
            pathname: '/storage/uploads/**',
          },
        ],
      },
      i18n: {
        locales: ["de_CH"],
        defaultLocale: "de_CH",
      }
};

export default nextConfig;
