import { useRouter } from "next/router";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { login } from "../utils/liff";
import { useLiff } from "../context/LiffContext";
import packageJson from "../package.json";

export default function Login(props) {
  /** You can access to liff and liffError object through the props.
   *  const { liff, liffError } = props;
   *  console.log(liff.getVersion());
   *
   *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
   **/
  const { isLoggedIn, liff } = useLiff();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return;
    router.replace('/create');
  }, [liff, isLoggedIn]);

  return (
    <div>
      <Head>
        <title>LIFF Starter</title>
      </Head>
      <div className="home">
        <img src="/images/logo.png" alt="logo" className="home__logo" />
        <h1 className="home__title">
          MINE Card<br />
        </h1>
        <p className="home__description">
        Create and share your namecard in LINE within minutes
        </p>
        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            MINE card
          </span>
          <span className="home__badges__badge badge--secondary">nextjs</span>
          <span className="home__badges__badge badge--primary">
            {packageJson.version}
          </span>
          <a
            href="https://github.com/foojiayin/line-namecard"
            target="_blank"
            rel="noreferrer"
            className="home__badges__badge badge--secondary"
          >
            GitHub
          </a>
        </div>
        <div className="home__buttons">
          <a
            onClick={() => liff.login()}
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--primary"
          >
            {isLoggedIn ? "Hello" : "Login" }
          </a>
          <a
            href="/create"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--tertiary"
          >
            Create
          </a>
          <a
            href="/about"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--secondary"
          >
            About us
          </a>
        </div>
      </div>
    </div>
  );
}
