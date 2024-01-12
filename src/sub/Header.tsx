import React from "react";

import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="header">
      <a
        href="https://app.paradigma.education/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} alt="logo" width="40" height="40" />
      </a>
    </header>
  );
}
