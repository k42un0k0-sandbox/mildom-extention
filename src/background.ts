import { Message, reqToggleChat, toggleChat } from "./messages";

chrome.tabs.onActivated.addListener(async function (activeInfo) {
  let url: string = "";
  try {
    url = (await getTabUrl(activeInfo.tabId)) ?? "";
  } catch (e) {
    url = "";
  }
  if (url != null) handleChangeUrl(url);
});

chrome.history.onVisited.addListener((historyItem) => {
  if (historyItem.url != null) {
    handleChangeUrl(historyItem.url);
  }
});

function handleChangeUrl(url: string) {
  const isMildom = isMildomUrl(url);
  if (isMildomUrl(url)) {
    chrome.action.setIcon({ path: "icons/16.png" });
  } else {
    chrome.action.setIcon({ path: "icons/16-gray.png" });
  }
  chrome.storage.local.set({ isMildom });
}

function isMildomUrl(url: string) {
  return url.startsWith("https://www.mildom.com/");
}

function getTabUrl(tabId: number) {
  return new Promise(getUrl(10));

  function getUrl(time: number) {
    return function (
      resolve: (value: string | undefined) => void,
      reject: (reason?: any) => void
    ) {
      if (time <= 0) reject(new Error("Can not get the tab."));
      chrome.tabs.get(tabId, (tab) => {
        if (tab == null) {
          setTimeout(() => {
            getUrl(time - 1)(resolve, reject);
          }, 100);
          return;
        }
        resolve(tab.url);
      });
    };
  }
}
