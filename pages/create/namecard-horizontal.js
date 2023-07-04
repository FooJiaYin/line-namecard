import React from "react";
import MessagePreview from "../../components/common/MessagePreview";
import BackgroundSelector from "../../components/create/BackgroundSelector";
import CreateForm from "../../components/create/CreateForm";
import { Checkbox, Input } from "../../components/create/Input";
import Row from "../../components/layout/Row";

export default function CreateHorizontal() {
  return (
    <CreateForm>
      <div style={{ flex: 2 }}>
        <Row>
          <Input label="姓名" field="name" />
          <Input label="姓名(英文)" field="nameEN" />
        </Row>
        <Row>
          <Input label="公司名稱" field="company" />
          <Input label="公司名稱(英文)" field="companyEN" />
        </Row>
        <Input label="公司Logo" field="logo" />
        <Row>
          <Input label="職稱" field="jobTitle" />
          <Input label="職稱(英文)" field="jobTitleEN" />
          <Checkbox label="底色" field="highlightTitle" />
        </Row>
        <Row>
          <Input label="Email" field="email" />
          <Input label="電話號碼" field="phone" />
        </Row>
        <Input label="地址" field="address" />
        <Input label="網頁" field="website" />
      </div>
      <div style={{ flex: 1 }}>
        <label>預覽</label>
        <MessagePreview template="namecard-horizontal" style={{ width: 400 }} />
        <Row>
          <Input label="字體顏色" field="textColor" type="color" />
          <Input label="公司名稱" field="companyColor" type="color" />
          <Input label="名字顏色" field="nameColor" type="color" />
          <Input label="背景顏色" field="backgroundColor" type="color" />
        </Row>
        <Row>
          <Input label="欄位比例（左）" field="leftFlex" type="number" style={{ width: 0 }} />
          <Input label="欄位比例（右）" field="rightFlex" type="number" style={{ width: 0 }} />
        </Row>
        <BackgroundSelector style={{ marginBottom: 12 }} />
      </div>
    </CreateForm>
  );
}