import React from "react";

import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" width="52" height="52" />
    </header>
  );
}
