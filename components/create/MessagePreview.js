import React from 'react'
import { flex2html } from '../../utils/flex2html'

export default function MessagePreview({message, style}) {
  const divStyle = {
    backgroundColor: "white", 
    // border: "1px solid #ccc",
    boxShadow: "5px 5px 10px #0001",
    borderRadius: "20px",
    overflow: "hidden",
    color: "#000",
    height: "fit-content",
    ...style,
  }
  return (
    <div style={divStyle} dangerouslySetInnerHTML={{ __html: flex2html(message[0]) }} />
  )
}
