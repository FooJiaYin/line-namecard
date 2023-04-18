import Link from "next/link";
import React, { useState } from 'react';

export default function Navbar() {
  // Responsive navbar
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className={`${isOpen ? "open" : ""}`}>
        <button className="toggle" onClick={handleToggle}>
          Menu
        </button>
        <ul>
          <li><Link href="/">首頁</Link></li>
          <li><Link href="/create">製作名片</Link></li>
          <li><Link href="/about">關於我們</Link></li>
        </ul>
      </nav>
      <style jsx>{`
          header {
            color: #fff !important;
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
          }
          
          nav {
            display: flex;
            justify-content: right;
            max-width: 1100px;
            margin: 0 auto;
            padding: 1rem;
          }
          
          nav ul {
            display: flex;
            gap: 1rem;
          }
          
          nav ul li {
            list-style: none;
          }
          
          nav a {
            text-decoration: none;
            color: #fff;
          }
          
          nav ul li a:hover {
            cursor: pointer;
            color: #59C1BD;
            text-decoration: underline;
          }
          
          .toggle {
            display: none;
          }
  
          /* Media queries */
          @media (max-width: 768px) {
            .toggle {
              display: block;
            }
            ul {
              display: none;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: #fff;
              padding: 1rem;
            }
            li {
              margin: 0.5rem 0;
            }
            nav.open ul {
              display: flex;
              flex-direction: column;
            }
          }
        `}</style>
    </header>
  )
}
