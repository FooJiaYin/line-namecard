import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function() {
    console.log(process.env.LIFF_ID )
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
        console.log("Success! you can do something with LIFF API here.")
    })
    .catch((error) => {
        console.log(error)
    })
});
