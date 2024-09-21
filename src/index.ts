import Sidebar from "@/components/sidebar";
import { addCSSFileToHead } from "@/styles/init";
import { renderComponent } from "@/utils/react-roots";

const ELEMENT_IDS = {
  WEBPLAYER_CONTENTS: "webplayer_contents",
  SIDEBAR: "sidebar",
  SERVICE_LNB: "serviceLnb",
};

const PLAYER_URL = "play.afreecatv.com";

addCSSFileToHead();

function createSidebarElement() {
  const sidebarDiv = document.createElement("div");
  sidebarDiv.id = ELEMENT_IDS.SIDEBAR;
  sidebarDiv.className =
    "absolute top-0 left-0 h-[calc(100vh-var(--gnb-height))]";
  return sidebarDiv;
}

function getTargetElement(isPlayerPage: boolean) {
  const elementId = isPlayerPage
    ? ELEMENT_IDS.WEBPLAYER_CONTENTS
    : ELEMENT_IDS.SERVICE_LNB;
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`'${elementId}' ID를 가진 요소를 찾을 수 없습니다.`);
    return null;
  }

  return element;
}

function renderSidebar() {
  const isPlayerPage = window.location.href.includes(PLAYER_URL);
  const targetElement = getTargetElement(isPlayerPage);

  if (!targetElement) return;

  if (isPlayerPage) {
    const sidebarElement = createSidebarElement();
    targetElement.appendChild(sidebarElement);
    renderComponent(ELEMENT_IDS.SIDEBAR, Sidebar);
  } else {
    renderComponent(ELEMENT_IDS.SERVICE_LNB, Sidebar);
  }
}

renderSidebar();
