import React, { useEffect, useState } from "react";
import { useLiff } from "../context/LiffContext";
export default function Home() {
  const { isLoggedIn, liff } = useLiff();
  
  return (
    <div>
      <input onChange={(e)=>setState(e.target.value)} value={state}/>
      <a
        onClick={() => {}}
        target="_blank"
        rel="noreferrer"
        className="home__buttons__button button--primary"
      >
        Send
      </a>
    </div>
  );
}
