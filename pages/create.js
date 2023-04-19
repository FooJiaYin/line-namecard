import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MessagePreview from "../components/common/MessagePreview";
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
      <Head><title>製作名片 - MINE Card</title></Head>
      <div
        className="row padded br-md"
        style={{ height: "100vh", alignItems: "center", padding: 20 }}
      >
        <div style={{ flex: 2 }}>
          <form>
            <div className="row">
              <div>
                <label>公司名稱</label>
                <input type="text" value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} />
              </div>
              <div>
                <label>公司名稱(英文)</label>
                <input type="text" value={data.companyEN} onChange={(e) => setData({ ...data, companyEN: e.target.value })} />
              </div>
            </div>
            <label>公司Logo</label>
            <input type="text" value={data.logo} onChange={(e) => setData({ ...data, logo: e.target.value })} />
            <div className="row">
              <div>
                <label>姓名</label>
                <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
              </div>
              <div>
                <label>姓名(英文)</label>
                <input type="text" value={data.nameEN} onChange={(e) => setData({ ...data, nameEN: e.target.value })} />
              </div>
            </div>

            <div className="row">
              <div>
                <label>職稱</label>
                <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
              </div>
              <div>
                <label>職稱(英文)</label>
                <input type="text" value={data.titleEN} onChange={(e) => setData({ ...data, titleEN: e.target.value })} />
              </div>
              <div style={{width: "maxContent"}}>
                <label>底色</label>
                <input type="checkbox" onChange={(e) => setData({ ...data, highlightTitle: e.target.checked })} />
              </div>
            </div>
            <label>Email</label>
            <input type="text" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            <label>電話號碼</label>
            <input type="text" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
            <label>地址</label>
            <input type="text" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
            <label>網頁</label>
            <input type="text" value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })} />
            <label>統一編號</label>
            <input type="text" value={data.taxId} onChange={(e) => setData({ ...data, taxId: e.target.value })} />
          </form>
        </div>
        <div style={{ flex: 1 }}>
          <label>預覽</label>
          <MessagePreview message={message} style={{ width: 400 }} />
          <form>
            <div className="row">
              <div>
                <label>字體顏色</label>
                <input type="color" value={data.textColor} onChange={(e) => setData({ ...data, textColor: e.target.value })} />
              </div>
              <div>
                <label>公司名稱</label>
                <input type="color" value={data.companyColor || data.textColor} onChange={(e) => setData({ ...data, companyColor: e.target.value })} />
              </div>
              <div>
                <label>名字顏色</label>
                <input type="color" value={data.nameColor || data.textColor} onChange={(e) => setData({ ...data, nameColor: e.target.value })} />
              </div>
              <div>
                <label>背景顏色</label>
                <input type="color" value={data.backgroundColor} onChange={(e) => setData({ ...data, backgroundColor: e.target.value, backgroundUrl: "" })} />
              </div>
            </div>
            <div className="row">
              <div style={{ width: 0 }}>
                <label>欄位比例（左）</label>
                <input type="number" value={data.leftFlex} onChange={(e) => setData({ ...data, leftFlex: e.target.value })} />
              </div>
              <div style={{ width: 0 }}>
                <label>欄位比例（右）</label>
                <input type="number" value={data.rightFlex} onChange={(e) => setData({ ...data, rightFlex: e.target.value })} />
              </div>
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
          </form>
          <center>
            <button onClick={() => send()}>傳送</button>
          </center>
        </div>
      </div>
    </div>
  );
}
