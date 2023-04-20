let liff;

const liffConfig = {
  liffId: process.env.LIFF_ID,
};

const getLiff = async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: This is an issue of @line/liff
  return window.liff ?? (await import("@line/liff")).default;
};

const registerLiffPlugin = (liff, plugin) => {
  Array.isArray(plugin) ? liff.use(...plugin) : liff.use(plugin);
};

const getInitializedLiff = async ({
  plugins = [],
  callback = () => {},
  ...rest
}) => {
  const liff = await getLiff();

  plugins.forEach((plugin) => registerLiffPlugin(liff, plugin));
  await liff.init(liffConfig);
  await callback(liff);

  return liff;
};

export async function initLiff(props) {
    console.log("start liff.init()...");
    try {
        liff = await getInitializedLiff(props);
        return liff;
    } catch (error) {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.LIFF_ID) {
            console.info("LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.");
        }
        return {liffError: error.toString() };
    }
}

export async function login() {
  if (!liff) await init();
  
  liff.is = () => true;
  // if (!liff.isLoggedIn()) {
  //   console.log("Please login");
  //   liff.login({ redirectUri: process.env.LIFF_URL });
  // } else {
  //   console.log("Successfully logged in");
  // }
}

export async function sendFlexMessage(message) {
  if (!liff) await init();

  if (liff.isApiAvailable("shareTargetPicker")) {
    console.log("shareTargetPicker is available");
    try {
      let flex_message = require("../assets/template/flex_message.json");
      flex_message[0].contents = message;
      let res = await liff.shareTargetPicker(flex_message);
      if (res) {
        console.log(`[${res.status}] Message sent!`);
      } else {
        console.log("TargetPicker was closed!");
      }
    } catch (error) {
      console.log("something wrong happen");
    }
  } else {
    console.log("shareTargetPicker is NOT available");
  }
}

export default liff;