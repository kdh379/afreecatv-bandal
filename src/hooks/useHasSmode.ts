import { useState, useEffect } from "react";

const PLAYER_AREA_ID = "player_area";
const playerArea = document.getElementById(PLAYER_AREA_ID);

function useHasSmode(): boolean {
  const [hasSmode, setHasSmode] = useState<boolean>(false);

  useEffect(() => {
    const checkSmode = () => {
      const bodyClasses = document.body.classList;
      setHasSmode(bodyClasses.contains("smode"));
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
    if (playerArea) {
      playerArea.style.setProperty("margin-left", hasSmode ? "0" : "228px");
    }
  }, [hasSmode]);

  return hasSmode;
}

export default useHasSmode;
