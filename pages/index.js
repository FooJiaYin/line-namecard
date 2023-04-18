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
    router.replace('/create');
  }, [isLoggedIn]);

  const style = {
    backgroundImage: "linear-gradient(to bottom, #2B3D7B, #407a9a, #59c1bd, #cff5e7, #f5f6f7)",
    height: "100vh",
  }

  return (
    <div>
      <div style={style}>
        <Head>
          <title>MINE Card</title>
        </Head>
        <Navbar />
        <Hero />
    </div>
    </div>
  );
}
