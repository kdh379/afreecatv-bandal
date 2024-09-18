import browser from "webextension-polyfill";

import { actionFetch, apiMap } from "@/utils/api";

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

browser.runtime.onMessage.addListener((request) => {
  // @ts-ignore
  const url = apiMap[request.action];
  if (url) {
    return actionFetch(url);
  }
  return Promise.resolve({ success: false, error: "Unknown action" });
});
