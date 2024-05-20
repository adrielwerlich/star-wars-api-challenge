import React, { useState, useEffect } from "react";

function Footer() {
  return (
    <div id="footer">
      <span id="footer-text">
        STARWARS LTDA | CNPJ: 77.777.777/0007-07 | 2023 | Todos os direitos
        reservados
      </span>
      <span id="vertical-line"></span>
      <img src="../images/footer-logo.svg" alt="" id="footer-logo" />
    </div>
  );
}

export default Footer;
