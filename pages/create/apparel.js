import React from "react";
import MessagePreview from "../../components/common/MessagePreview";
import ButtonList from "../../components/create/ButtonList";
import CreateForm from "../../components/create/CreateForm";
import { Input } from "../../components/create/Input";

export default function CreateApparel() {
  return (
    <CreateForm>
      <div style={{ flex: 2 }}>
        <Input label="標題" field="title" />
        <Input label="內文" field="description" />
        <Input label="背景圖片連結（3:2）" field="backgroundUrl" />
        <ButtonList />
        <div className="row">
          <Input label="背景顏色" field="backgroundColor" type="color" />
          <Input label="字體顏色" field="textColor" type="color" />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <label>預覽</label>
        <MessagePreview template="apparel" style={{ width: 300 }} />
      </div>
    </CreateForm>
  );
}
