import Link from "next/dist/client/link";
import React from "react";
import { FaPaperPlane, FaPen } from "react-icons/fa";
import MessagePreview from "../components/common/MessagePreview";
import { useLiff } from "../hooks/useLiff";
import { sendFlexMessage } from "../utils/liff";
import { getDataFromUrl } from "../utils/route";

export default function Share({ template, data, message, url }) {
  const { isLoggedIn, liff } = useLiff();

  const send = () => {
    if (isLoggedIn) {
      sendFlexMessage(message);
    } else {
      liff.login({
        redirectUri: url.replace("share", "create") + "&send=1",
      });
    }
  };

  return (
    <div className="middle full">
      <div>
        <MessagePreview
          template={template}
          message={message}
          style={{ maxWidth: 400, maxHeight: 400, marginBottom: "50px" }}
        />
        <div className="row wrap" style={{ justifyContent: "center" }}>
          <button onClick={send}>
            傳送 <FaPaperPlane size={12} />
          </button>
          <Link href={url.replace("share", "create")}>
            <button>
              編輯 <FaPen size={12} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = getDataFromUrl;
