import { createRoot } from "react-dom/client";

import { Body } from "./Body";
import "./index.css";

const container = document.getElementById("container");
if (container) {
  const root = createRoot(container);
  root.render(<Body />);
}
