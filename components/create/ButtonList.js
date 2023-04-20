import React from "react";
import { FormProvider, useForm } from "../../hooks/useForm";
import { Input } from "./Input";

export default function ButtonList() {
  const [formData, setFormData] = useForm();

  const onButtonChange = (button, index) => {
    console.log("button Changed", button, index)
    formData.buttons[index] = button;
    setFormData({...formData, buttons: formData.buttons});
  };

  return (
    <div>
      {formData.buttons.map((button, index) => (
        <FormProvider value={[button, (e) => onButtonChange(e, index)]} key={index}>
          <div className="row">
            <Input label="按鈕文字" field="text" />
            <Input label="按鈕連結" field="url" />
            <Input label="按鈕顏色" field="backgroundColor" type="color" />
          </div>
        </FormProvider>
      ))}
    </div>
  );
}
