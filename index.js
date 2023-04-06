import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
    console.log(process.env.LIFF_ID )
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
        /* Login to LIFF */
		if (!liff.isLoggedIn()) {
		    console.log("Please login");
		    liff.login({ redirectUri: process.env.LIFF_URL });
		} else {
		    if ( liff.isApiAvailable('shareTargetPicker')) {
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
