import "@/styles/global.css";

export function addCSSFileToHead() {
  const font = document.createElement("link");
  font.rel = "stylesheet";
  font.type = "text/css";
  font.crossOrigin = "";
  font.href =
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css";
  document.head.appendChild(font);
}
