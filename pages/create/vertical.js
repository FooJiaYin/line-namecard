import React from "react";
import MessagePreview from "../../components/common/MessagePreview";
import BackgroundSelector from "../../components/create/BackgroundSelector";
import { Checkbox, Input } from "../../components/create/Input";
import CreateForm from "../../components/create/CreateForm";

export default function CreateVertical() {
  return (
    <CreateForm>
      <div style={{ flex: 2 }}>
        <div className="row">
          <Input label="姓名" field="name" />
          <Input label="姓名(英文)" field="nameEN" />
        </div>
        <div className="row">
          <Input label="公司名稱" field="company" />
          <Input label="公司名稱(英文)" field="companyEN" />
        </div>
        <Input label="公司Logo" field="logo" />
        <div className="row">
          <Input label="職稱" field="title" />
          <Input label="職稱(英文)" field="titleEN" />
          <Checkbox label="底色" field="highlightTitle" />
        </div>
        <div className="row">
          <Input label="Email" field="email" />
          <Input label="電話號碼" field="phone" />
        </div>
        <Input label="地址" field="address" />
        <Input label="網頁" field="website" />
      </div>
      <div style={{ flex: 1 }}>
        <label>預覽</label>
        <MessagePreview template="namecard_vertical" style={{ width: 300 }} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="row">
          <Input label="字體顏色" field="textColor" type="color" />
          <Input label="公司名稱" field="companyColor" type="color" />
          <Input label="名字顏色" field="nameColor" type="color" />
          <Input label="背景顏色" field="backgroundColor" type="color" />
        </div>
        <div className="row">
          <Input label="欄位比例（上）" field="topFlex" type="number" style={{ width: 0 }} />
          <Input label="欄位比例（中）" field="middleFlex" type="number" style={{ width: 0 }} />
          <Input label="欄位比例（下）" field="bottomFlex" type="number" style={{ width: 0 }} />
        </div>
        <BackgroundSelector orientation="vertical" height={48} style={{ marginBottom: 12 }} />
      </div>
    </CreateForm>
  );
}
