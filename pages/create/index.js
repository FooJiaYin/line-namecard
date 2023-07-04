import dynamic from "next/dist/shared/lib/dynamic";
import Link from "next/link";
import React from "react";
import { getDataFromUrl } from "../../utils/route";

export default function Create({ template, data }) {
  let Component = () => <div></div>;
  if (template) Component = dynamic(() => import("/pages/create/" + template));

  return template && data ? <Component /> : (
    <div className="middle">
      <Link href="/create/namecard-horizontal">橫式名片</Link>
      <Link href="/create/namecard-vertical">直式名片</Link>
      <Link href="/create/apparel">介紹卡片</Link>
    </div>
  );
}

export const getServerSideProps = getDataFromUrl;