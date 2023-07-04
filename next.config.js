module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.DOMAIN_URL.replace("https://", "")],
    loader: "imgix",
    path: "",
  },
  env: {
    LIFF_ID: process.env.LIFF_ID,
    LIFF_URL: process.env.LIFF_URL,
    DOMAIN_URL: process.env.DOMAIN_URL,
  },
};
