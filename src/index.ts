import { renderComponent } from "@/utils/react-roots";
import Sidebar from "@/components/sidebar";
import "@/styles/global.css";

function addCSSFileToHead() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "./style.css";
  document.head.appendChild(link);

  const font = document.createElement("link");
  font.rel = "stylesheet";
  font.type = "text/css";
  font.crossOrigin = "";
  font.href =
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css";
  document.head.appendChild(font);
}

addCSSFileToHead();

renderComponent("serviceLnb", Sidebar);
