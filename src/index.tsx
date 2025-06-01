import React from "react";
import { createRoot } from "react-dom/client";

import { Body } from "./Body";

const container = document.getElementById("container");
if (container) {
  const root = createRoot(container);
  root.render(<Body />);
}
