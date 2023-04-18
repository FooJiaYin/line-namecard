module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.LIFF_URL.replace("https://", "")],
    disableStaticImages: true,
  },
  env: {
    LIFF_ID: process.env.LIFF_ID,
    LIFF_URL: process.env.LIFF_URL,
  },
};
