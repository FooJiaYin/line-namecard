import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        /* Login to LIFF */
		if (!liff.isLoggedIn()) {
		    console.log("Please login");
		    liff.login({ redirectUri: process.env.LIFF_URL });
		} else {
            console.log("Successfully logged in");
		    if ( liff.isApiAvailable('shareTargetPicker')) {
                let sample_message = require("./sample_message.json");
		        liff.shareTargetPicker(sample_message)
				.then(function (res) {
					if (res) {
					  console.log(`[${res.status}] Message sent!`);
					} else {
					  console.log("TargetPicker was closed!");
					}
				  })
				  .catch(function (error) {
					console.log("something wrong happen");
				  });
		    }
		}
    })
    .catch((error) => {
        console.log(error)
    })
});
