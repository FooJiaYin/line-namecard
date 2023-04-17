import React, { useEffect } from "react";
import { sendFlexMessage } from "../api/line/liff";
import { useLiff } from "../context/LiffContext";

export default function Home() {
  const { isLoggedIn, liff } = useLiff();
  
  return (
    <a
      onClick={() => sendFlexMessage()}
      target="_blank"
      rel="noreferrer"
      className="home__buttons__button button--primary"
    >
      Send
    </a>
  );
}
