import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import MessagePreview from "../components/common/MessagePreview";
import { Checkbox, Input } from "../components/create/Input";
import { FormProvider } from "../hooks/useForm";
import { useLiff } from "../hooks/useLiff";
import { sendFlexMessage } from "../utils/liff";
import { generateMessage, getBackgroundImagePath } from "../utils/message";

// form to generate namecard
export default function Create() {
  const { isLoggedIn, liff } = useLiff();
  const [message, setMessage] = useState("");
  const [data, setData] = useState(require("../assets/data/default.json"));

  useEffect(() => {
    const message = generateMessage("namecard", data);
    setMessage(message);
  }, [data]);

  const send = () => {
    if (isLoggedIn) {
      sendFlexMessage(message);
    } else {
      liff.login();
    }
  };

  return (
    <div>
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
          style={{ height: "100vh", alignItems: "center", padding: 20 }}
        >
          <div style={{ flex: 2 }}>
            <div className="row">
              <Input label="姓名" field="name" />
              <Input label="姓名(英文)" field="nameEN" />
            </div>
            <div className="row">
              <Input label="公司名稱" field="company" />
              <Input label="公司名稱(英文)" field="companyEN" />
            </div>
            <Input label="公司Logo" field="logo" />
            <div className="row">
              <Input label="職稱" field="title" />
              <Input label="職稱(英文)" field="titleEN" />
              <Checkbox label="底色" field="highlightTitle" />
            </div>
            <div className="row">
              <Input label="Email" field="email" />
              <Input label="電話號碼" field="phone" />
            </div>
            <Input label="地址" field="address" />
            <Input label="網頁" field="website" />
            <Input label="統一編號" field="taxId" />
          </div>
          <div style={{ flex: 1 }}>
            <label>預覽</label>
            <MessagePreview message={message} style={{ width: 400 }} />
            <div className="row">
              <Input label="字體顏色" field="textColor" type="color" />
              <Input label="公司名稱" field="companyColor" type="color" />
              <Input label="名字顏色" field="nameColor" type="color" />
              <Input label="背景顏色" field="backgroundColor" type="color" />
            </div>
            <div className="row">
              <Input label="欄位比例（左）"  field="leftFlex" type="number" style={{ width: 0 }} />
              <Input label="欄位比例（右）" field="rightFlex" type="number"  style={{ width: 0 }} />
            </div>
            <label>選擇背景：</label>
            <div className="row wrap" style={{ marginBottom: 12 }}>
              {Array(27).fill(0).map((_, j) => (
                <div style={{ width: 17 * 2, height: 10 * 2, position: "relative" }} key={j}>
                    <Image src={getBackgroundImagePath(j + 1)} loading="lazy" layout="fill"
                      onClick={() => setData({
                        ...data,
                        backgroundUrl: getBackgroundImagePath(j + 1),
                        backgroundColor: "#00000000",
                      })}
                    />
                  </div>
                ))}
            </div>
            <label>或輸入圖片網址：</label>
            <input value={data.backgroundUrl} onChange={(e) => setData({ ...data, backgroundUrl: e.target.value })} />
          <center>
            <button onClick={() => send()}>傳送</button>
          </center>
        </div>
      </div>
      </FormProvider>
    </div>
  );
}
