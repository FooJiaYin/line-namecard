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
    // Load sample message
    const sampleData = require("../../assets/data/sample.json");
    setMessage(generateMessage("namecard-horizontal", sampleData));
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>MINE Card</h1>
        <p className={styles.description}>製作你的個人名片，並分享到 LINE</p>
        {!isLoggedIn && (
          <button className={styles.button} onClick={() => liff.login({ redirectUri: process.env.LIFF_URL })}>
            LINE 登入
          </button>
        )}
        <Link href="/create">
          <button className={styles.button}>開始製作</button>
        </Link>
      </div>
      <MessagePreview className={styles.messagePreview} message={message} style={{ width: 425 }} horizontal />
    </section>
  );
}
