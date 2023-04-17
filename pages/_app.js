import "../styles/globals.css";
import { LiffProvider } from '../context/LiffContext';
// import { initLiff } from "../api/line/liff";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  // useEffect(() => {
  //   initLiff().then(({liff, liffError}) => {
  //       setLiffObject(liff);
  //       setLiffError(liffError);
  //   })
  // }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  return (
    <LiffProvider>
      <Component {...pageProps} />
    </LiffProvider>
  );
}

export default MyApp;
