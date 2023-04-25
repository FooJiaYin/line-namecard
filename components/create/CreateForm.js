import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FormProvider } from "../../hooks/useForm";
import { useLiff } from "../../hooks/useLiff";
import { sendFlexMessage } from "../../utils/liff";
import { useRouter } from "next/dist/client/router";
import { decodeData } from "../../utils/compress";
import { getUrl } from "../../utils/route";
import { generateMessage } from "../../utils/message";

// form to generate namecard
export default function CreateForm({ children, initialData }) {
  const router = useRouter();
  const { isLoggedIn, liff } = useLiff();
  const [sharebuttonText, setShareButtonText] = useState("分享連結");
  const [data, setData] = useState(initialData ?? require("/assets/data/default.json"));
  let template = router.query.template ?? router.asPath.split("/").pop().split("?")[0] ?? "apparel";

  useEffect(() => {
    // get data from router query
    if (!initialData) {
      let { code } = router.query;
      if (code) {
        setData(decodeData(template, code));
      }
    }
  }, [router.query]);

  const send = async () => {
    if (isLoggedIn) {
      let message = generateMessage(template, data);
      await sendFlexMessage(message, template);
    } else {
      liff.login({
        redirectUri: getUrl("send", template, { data })
      });
    }
  };

  const share = () => {
    let url = getUrl("share", template, { data });
    if (liff.getOS() != "web" && navigator.canShare()) {
      navigator.share({
        title: `與你分享我在 MINE Card 上的名片！`,
        // text: "MINE Card",
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      setShareButtonText("已複製！");
      setTimeout(() => {
        setShareButtonText("分享連結");
      }, 2000);
    }
  };

  return (
    <div className="middle full">
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
          style={{
            alignItems: "center",
            padding: 20,
            height: "100%",
            width: "100%"
          }}
        >
          {children}
        </div>
        <div className="row wrap" style={{ justifyContent: "center" }}>
          <button onClick={send}>傳送</button>
          <button onClick={share}>{sharebuttonText}</button>
        </div>
      </FormProvider>
    </div>
  );
}