/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },
  env: {
    NEXT_PUBLIC_MODE: 'dev',
  },
  experimental:  {
    outputStandalone: true,
  },

  reactStrictMode: true,

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
	rewrites: () => {
        return [
        {
            source: "/dev/rest/v1/ideas",
            destination: "http://localhost:8080/rest/v1/ideas",
        },
        {
            source: "/prod/rest/v1/ideas",
            destination: "http://idea-bucket-server:8080/rest/v1/ideas",
        },
        {
            source: "/dev/rest/v1/submitIdea",
            destination: "http://localhost:8080/rest/v1/submitIdea",
        },
        {
            source: "/prod/rest/v1/submitIdea",
            destination: "http://idea-bucket-server:8080/rest/v1/submitIdea",
        },
        {
            source: "/dev/rest/v1/delete",
            destination: "http://localhost:8080/rest/v1/delete",
        },
        {
            source: "/prod/rest/v1/delete",
            destination: "http://idea-bucket-server:8080/rest/v1/delete",
        },
        {
            source: "/dev/rest/v1/register",
            destination: "http://localhost:8080/rest/v1/register",
        },
        {
            source: "/prod/rest/v1/register",
            destination: "http://idea-bucket-server:8080/rest/v1/register",
        },
        {
            source: "/dev/rest/v1/login",
            destination: "http://localhost:8080/rest/v1/login",
        },
        {
            source: "/prod/rest/v1/login",
            destination: "http://idea-bucket-server:8080/rest/v1/login",
        },
        {
            source: "/dev/rest/v1/login/:token",
            destination: "http://localhost:8080/rest/v1/login/:token",
        },
        {
            source: "/prod/rest/v1/login/:token",
            destination: "http://idea-bucket-server:8080/rest/v1/login/:token",
        },
        {
            source: "/dev/rest/v1/logout",
            destination: "http://localhost:8080/rest/v1/logout",
        },
        {
            source: "/prod/rest/v1/logout/",
            destination: "http://idea-bucket-server:8080/rest/v1/logout",
        },
        {
            source: "/dev/rest/v1/accountSettings",
            destination: "http://localhost:8080/rest/v1/accountSettings",
        },
        {
            source: "/prod/rest/v1/accountSettings",
            destination: "http://idea-bucket-server:8080/rest/v1/accountSettings",
        },
        {

            source: "/dev/rest/v1/supportRequest",
            destination: "http://localhost:8080/rest/v1/supportRequest",
        },
        {
            source: "/prod/rest/v1/accountSettings",
            destination: "http://idea-bucket-server:8080/rest/v1/supportRequest",
        },
        {

            source: "/dev/rest/v1/subscribe",
            destination: "http://localhost:8080/rest/v1/subscribe",
        },
        {
            source: "/prod/rest/v1/subscribe",
            destination: "http://idea-bucket-server:8080/rest/v1/subscribe",
        }
    ];
	},
};
