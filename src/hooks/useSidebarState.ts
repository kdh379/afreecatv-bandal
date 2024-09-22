import { useEffect, useState } from "react";

const PLAYER_AREA_ID = "player_area";
const playerArea = document.getElementById(PLAYER_AREA_ID);

const SERVICE_LNB_ID = "serviceLnb";
const serviceLnb = document.getElementById(SERVICE_LNB_ID);

export const useSidebarState = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSmode, setIsSmode] = useState(false);

  useEffect(() => {
    const checkSmode = () => {
      const bodyClasses = document.body.classList;
      setIsSmode(bodyClasses.contains("smode"));
    };

    checkSmode();

    // MutationObserver를 사용하여 body의 class 변화 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          checkSmode();
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playerArea) return;

    playerArea.style.setProperty(
      "margin-left",
      isSmode
        ? "0"
        : isExpanded
          ? "var(--sidebar-width)"
          : "var(--sidebar-collapsed-width)",
    );

    if (serviceLnb) {
      serviceLnb.style.setProperty(
        "width",
        isExpanded ? "var(--sidebar-width)" : "var(--sidebar-collapsed-width)",
      );
    }
  }, [isExpanded, isSmode]);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return { isExpanded, isSmode, toggleSidebar };
};
