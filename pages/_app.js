import "../styles/globals.css";
import "../styles/flex2html.css"
import { LiffProvider } from '../context/LiffContext';
// import { initLiff } from "../api/line/liff";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <LiffProvider>
      <Component {...pageProps} />
    </LiffProvider>
  );
}

export default MyApp;
