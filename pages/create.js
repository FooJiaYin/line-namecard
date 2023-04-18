// react functional component form to generate namecard

import React, { useEffect, useState } from "react";
import MessagePreview from "../components/create/MessagePreview";
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
    <div className="container">
      <form>
        <label>公司名稱</label>
        <input type="text" value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} />
        <label>公司名稱(英文)</label>
        <input type="text" value={data.companyEN} onChange={(e) => setData({ ...data, companyEN: e.target.value })} />
        <label>公司Logo</label>
        <input type="text" value={data.logo} onChange={(e) => setData({ ...data, logo: e.target.value })} />
        <label>姓名</label>
        <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        <label>姓名(英文)</label>
        <input type="text" value={data.nameEN} onChange={(e) => setData({ ...data, nameEN: e.target.value })} />
        <label>職稱</label>
        <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        <label>職稱(英文)</label>
        <input type="text" value={data.titleEN} onChange={(e) => setData({ ...data, titleEN: e.target.value })} />
        <label>Email</label>
        <input type="text" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        <label>電話號碼</label>
        <input type="text" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
        <label>地址</label>
        <input type="text" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
        <label>地址(英文)</label>
        <input type="text" value={data.addressEN} onChange={(e) => setData({ ...data, addressEN: e.target.value })} />
        <label>網頁</label>
        <input type="text" value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })} />
        <label>統一編號</label>
        <input type="text" value={data.taxId} onChange={(e) => setData({ ...data, taxId: e.target.value })} />

      </form>
      <MessagePreview message={message} style={{ width: 400 }} />
      <a
        onClick={() => send()}
        target="_blank"
        rel="noreferrer"
        className="home__buttons__button button--primary"
      >
        Send
      </a>
    </div>
  );
}
