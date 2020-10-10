import lozad from "lozad";
import { smoothScrollAnchor } from "smooth-scroll-anchor";
import "../css/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrollAnchor({ behaviour: "smooth", block: "start" });
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
});
