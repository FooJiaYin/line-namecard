import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Hero from "../components/landing-page/Hero";
import Navbar from "../components/landing-page/Navbar";
import { useLiff } from "../hooks/useLiff";

export default function Login(props) {
  /** You can access to liff and liffError object through the props.
   *  const { liff, liffError } = props;
   *  console.log(liff.getVersion());
   *
   *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
   **/
  const router = useRouter();
  const { isLoggedIn } = useLiff();

  useEffect(() => {
    if (!isLoggedIn) return;
    router.replace("/create");
  }, [isLoggedIn]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Head>
        <title>MINE Card</title>
      </Head>
      <Navbar />
      <div className={"bg-gradient"}>
        <Hero />
      </div>
    </div>
  );
}
