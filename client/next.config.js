/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },
  env: {
    MAPBOX_ACCESS_TOKEN:
      'pk.eyJ1Ijoic2hhbmVsZWVlIiwiYSI6ImNqd2RzbDQ2bzE1ejQ0OG1vOWNhaWk0a3YifQ.nZMoPave66hDIrmD9OgbzA',
  },

  reactStrictMode: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

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
            destination: "http://localhost:8000/rest/v1/ideas",
        },
        {
            source: "/dev/rest/v1/submitIdea",
            destination: "http://localhost:8080/rest/v1/submitIdea",
        },
        {
            source: "/prod/rest/v1/submitIdea",
            destination: "http://localhost:8000/rest/v1/submitIdea",
        },
        {
            source: "/dev/rest/v1/delete",
            destination: "http://localhost:8080/rest/v1/delete",
        },
        {
            source: "/prod/rest/v1/delete",
            destination: "http://localhost:8000/rest/v1/delete",
        },
        {
            source: "/dev/rest/v1/register",
            destination: "http://localhost:8080/rest/v1/register",
        },
        {
            source: "/prod/rest/v1/register",
            destination: "http://localhost:8000/rest/v1/register",
        },
        {
            source: "/dev/rest/v1/login",
            destination: "http://localhost:8080/rest/v1/login",
        },
        {
            source: "/prod/rest/v1/login/",
            destination: "http://localhost:8000/rest/v1/login",
        },
        {
            source: "/dev/rest/v1/login/:token",
            destination: "http://localhost:8080/rest/v1/login/:token",
        },
        {
            source: "/prod/rest/v1/login",
            destination: "http://localhost:8000/rest/v1/login/:token",
        },
        {
            source: "/dev/rest/v1/accountSettings",
            destination: "http://localhost:8080/rest/v1/accountSettings",
        },
        {
            source: "/prod/rest/v1/accountSettings",
            destination: "http://localhost:8000/rest/v1/accountSettings",
        }
    ];
	},
};
