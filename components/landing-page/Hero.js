import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLiff } from "../../hooks/useLiff";
import { generateMessage } from "../../utils/message";
import MessagePreview from "../common/MessagePreview";
import styles from "./Hero.module.css";

export default function Hero() {
  const { isLoggedIn, liff } = useLiff();
  const [message, setMessage] = useState({});

  useEffect(() => {
    const sampleData = require("../../assets/data/sample.json");
    setMessage(generateMessage("namecard", sampleData));
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>MINE Card</h1>
        <p className={styles.heroDescription}>
          製作你的個人名片，並分享到 LINE
        </p>
        {!isLoggedIn ? (
          <button className={styles.ctaButton} onClick={() => liff.login()}>
            LINE 登入
          </button>
        ) : null}
        <Link href="/create">
          <button className={styles.ctaButton}>開始製作</button>
        </Link>
      </div>
      <MessagePreview message={message} style={{ width: 425 }} />
    </section>
  );
}
