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
    <div style={{ minHeight: "100vh" }}>
      <Head>
        <title>製作名片 - MINE Card</title>
      </Head>
      <div style={{ position: "absolute" }}>
        <Link href="/">
          <button style={{ padding: "6px 8px" }}>
            <FaArrowLeft />
          </button>
        </Link>
      </div>
      <FormProvider value={[data, setData]}>
        <div
          className="row padded br-md"
          style={{ alignItems: "center", padding: 20 }}
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
