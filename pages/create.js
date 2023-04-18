// react functional component form to generate namecard

import React, { useEffect, useState } from "react";
import { useLiff } from "../hooks/useLiff";
import { flex2html } from "../utils/flex2html";
import { sendFlexMessage } from "../utils/liff";
import { generateMessage } from "../utils/message";

// form to generate namecard
export default function Create() {
  const { isLoggedIn, liff } = useLiff();
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    company: "公司名稱",
    companyEN: "Company Name",
    // example logo
    logo: "/images/logo.png",
    name: "你的名字",
    nameEN: "Your Name",
    title: "你的職稱",
    titleEN: "Your Title",
    email: "youremail@gmail.com",
    phone: "0912345678",
    address: "你的地址",
    addressEN: "Your Address",
    website: "https://yourwebsite.com",
    taxId: "12345678"

    // company: "夢想一號魔術方塊學院",
    // companyEN: "Dream One Cube Academy",
    // logo: "https://i0.wp.com/dreamcube.tw/wp-content/uploads/2023/03/%E6%AD%A3%E6%96%B9%E5%BD%A2%E7%B4%94LOGO%E9%80%8F%E6%98%8E%E5%BA%95-1.png",
    // name: "李孟一",
    // nameEN: "Meng-Yi Li",
    // title: "執行長",
    // titleEN: "CEO",
    // email: "one@dreamcube.tw",
    // phone: "0912345678",
    // address: "台北市中正區羅斯福路一段一號",
    // addressEN: "No.1, Sec. 1, Roosevelt Rd., Zhongzheng Dist., Taipei City 100, Taiwan (R.O.C.)",
    // website: "https://dreamcube.tw",
    // taxId: "90468673"
  });

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
      <div dangerouslySetInnerHTML={{ __html: flex2html(message[0]) }} />
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
