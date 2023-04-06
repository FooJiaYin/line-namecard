let liffInstance;

export async function init() {
    
  if (liffInstance) {
    return liffInstance;
  }
    console.log("start liff.init()...");
    try {
        let liff = await import("@line/liff");
        await liff.init({ liffId: process.env.LIFF_ID });
        console.log("liff.init() done");
        liffInstance = liff;
        return { liff: liff };
    } catch (error) {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.LIFF_ID) {
            console.info("LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.");
        }
        return {liffError: error.toString() };
    }
}

export async function login() {
  const liff = await init();
    
  if (!liff.isLoggedIn()) {
    console.log("Please login");
    liff.login({ redirectUri: process.env.LIFF_URL });
  } else {
    console.log("Successfully logged in");
  }
}

export async function sendMessage() {
  const liff = await init();

  if (liff.isApiAvailable("shareTargetPicker")) {
    console.log("shareTargetPicker is available");
    let sample_message = require("./sample_message.json");
    try {
      let res = await liff.shareTargetPicker(sample_message);
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