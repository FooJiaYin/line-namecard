import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FormProvider } from "../../hooks/useForm";
import { useLiff } from "../../hooks/useLiff";
import { sendFlexMessage } from "../../utils/liff";
import { generateMessage } from "../../utils/message";

// form to generate namecard
export default function CreateForm({ children }) {
  const { isLoggedIn, liff } = useLiff();
  const [message, setMessage] = useState("");
  const [data, setData] = useState(require("../../assets/data/default.json"));

  const send = () => {
    if (isLoggedIn) {
      sendFlexMessage(message);
    } else {
      liff.login();
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Head>
        <title>製作名片 - MINE Card</title>
      </Head>
      <div style={{ position: "absolute", top: 0 }}>
        <Link href="/">
          <button style={{ padding: "6px 8px" }}>
            <FaArrowLeft />
          </button>
        </Link>
      </div>
      <FormProvider value={[data, setData]}>
        <div
          className="row padded br-md"
          style={{ alignItems: "center", padding: 20, height: "100%" }}
        >
          {children}
        </div>
        <center>
          <button onClick={() => send()}>傳送</button>
        </center>
      </FormProvider>
    </div>
  );
}
