import Link from "next/link";
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className={`${isOpen ? "open" : ""}`}>
        <button className="toggle" onClick={handleToggle} >{isOpen ? <FaTimes /> : <FaBars />}</button>
        <ul>
          <li><Link href="/">首頁</Link></li>
          <li><Link href="/create">製作名片</Link></li>
          <li><Link href="/about">關於我們</Link></li>
        </ul>
      </nav>
    </header>
  )
}
