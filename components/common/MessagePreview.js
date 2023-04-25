import React from "react";
import { useForm } from "../../hooks/useForm";
import { flex2html } from "../../utils/flex2html";
import { generateMessage } from "../../utils/message";
import styles from "./MessagePreview.module.css";

export default function MessagePreview({ message, template, style, className, horizontal, ...props }) {
  // Set horizontal to true if template contains "horizontal"
  horizontal = horizontal ?? (template && template.includes("horizontal"));

  const divStyle = {
    aspectRatio: horizontal ? "1.7" : "2/3",
    width: (style.maxHeight || style.height) ? "auto" : "100%",
    ...style,
  };

  // Generate message from data if message is not provided
  if (!message) {
    const [data, _] = useForm();
    message = generateMessage(template, data);
  }
  return (
    <div className={`${styles.default} ${className}`} style={divStyle} dangerouslySetInnerHTML={{ __html: flex2html(message) }} {...props} />
  )
}
