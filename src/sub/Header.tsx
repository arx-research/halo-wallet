import React from "react";

import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <a
        href="https://app.paradigma.education/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} alt="logo" width="30" height="30" />
      </a>
    </header>
  );
}
