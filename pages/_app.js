import "../styles/globals.css";
import LiffContext from "../context/liffContext";
import * as liff from "../api/line/liff.js";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    liff
      .init()
      .then(({liff, liffError}) => {
          setLiffObject(liff);
          setLiffError(liffError);
      })
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  return (
    <LiffContext.Provider value={liffObject}>
      <Component {...pageProps} />
    </LiffContext.Provider>
  );
}

export default MyApp;
