import React from "react";
import { FormProvider, useForm } from "../../hooks/useForm";
import { Input } from "./Input";
import { MdOutlineAddCircleOutline, MdOutlineRemoveCircleOutline } from "react-icons/md";

export default function ButtonList() {
  const [formData, setFormData] = useForm();
  const { buttons } = require("../../assets/data/default.json");

  const onButtonChange = (button, index) => {
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
            <Input label="按鈕顏色" field="backgroundColor" type="color"  className="narrow"/>
            <div style={{display: "flex", flexDirection: "column", margin: "auto 0"}}  className="narrow">
              <MdOutlineAddCircleOutline size={20} style={{margin: "8 0"}} color="#407a9a" 
                onClick={() => {
                  formData.buttons.splice(index + 1, 0, buttons[1]);
                  setFormData({...formData, buttons: formData.buttons});
                }}
              />
              <MdOutlineRemoveCircleOutline size={20} color="#D24B4B" 
                onClick={() => {
                  formData.buttons.splice(index, 1);
                  setFormData({...formData, buttons: formData.buttons});
                }}
              />
            </div>
          </div>
        </FormProvider>
      ))}
    </div>
  );
}
