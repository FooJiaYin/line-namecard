import React from "react";
import { useForm } from "../../hooks/useForm";
import { flex2html } from "../../utils/flex2html";
import { generateMessage } from "../../utils/message";

export default function MessagePreview({ message, template, style, ...props }) {
  const divStyle = {
    backgroundColor: "white",
    boxShadow: "5px 5px 10px #0002",
    borderRadius: "20px",
    overflow: "hidden",
    color: "#000",
    // height: "fit-content",
    aspectRatio: 1.7,
    width: "100%",
    maxWidth: "100%",
    ...style,
  };

  // Generate message from data if message is not provided
  if (!message) {
    const [data, _] = useForm();
    message = generateMessage(template, data);
  }
  return (
    <div style={divStyle} dangerouslySetInnerHTML={{ __html: flex2html(message) }} {...props} />
  )
}
