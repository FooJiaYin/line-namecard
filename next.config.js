module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.LIFF_URL.replace("https://", "")],
    loader: "imgix",
    path: "",
  },
  env: {
    LIFF_ID: process.env.LIFF_ID,
    LIFF_URL: process.env.LIFF_URL,
  },
};
