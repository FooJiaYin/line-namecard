// react functional component form to generate namecard

import React, { useEffect, useState } from "react";
import { useLiff } from "../context/LiffContext";
import { sendFlexMessage } from "../utils/liff";
import { generateMessage } from "../utils/message";

// form to generate namecard
export default function Create() {
  const { isLoggedIn, liff } = useLiff();
  const [data, setData] = useState({});

  const send = () => {
    if (isLoggedIn) {
      sendFlexMessage();
    } else {
      liff.login();
    }
  };

  return (
    <div className="container">
      <form>
        {" "}
        <label>Company</label>
        <input
          type="text"
          value={data.company}
          onChange={(e) => setData({ ...data, company: e.target.value })}
        />
        <label>Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label>Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <label>Email</label>
        <input
          type="text"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Phone</label>
        <input
          type="text"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        <label>Address</label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
        <label>Website</label>
        <input
          type="text"
          value={data.website}
          onChange={(e) => setData({ ...data, website: e.target.value })}
        />
      </form>
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
