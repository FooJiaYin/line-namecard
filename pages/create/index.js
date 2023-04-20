import Link from 'next/link'
import React from 'react'

export default function Create() {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <Link href="/create/horizontal">橫式名片</Link>
      <Link href="/create/vertical">直式名片</Link>
      <Link href="/create/apparel">介紹卡片</Link>
    </div>
  )
}
