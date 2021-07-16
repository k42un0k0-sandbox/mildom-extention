chrome.tabs.onActivated.addListener(async function (activeInfo) {
  let url;
  try {
    url = await getTabUrl(activeInfo.tabId);
  } catch (e) {
    url = "";
  }
  handleChangeUrl(url);
});

chrome.history.onVisited.addListener((historyItem) => {
  handleChangeUrl(historyItem.url);
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(["isMildom"], ({ isMildom }) => {
    if (isMildom) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: toggleDisplayOfChatside,
      });
    }
  });
});

function handleChangeUrl(url) {
  const isMildom = isMildomUrl(url);
  if (isMildomUrl(url)) {
    chrome.action.setIcon({ path: "icons/16.png" });
  } else {
    chrome.action.setIcon({ path: "icons/16-gray.png" });
  }
  chrome.storage.local.set({ isMildom });
}

function isMildomUrl(url) {
  return url.startsWith("https://www.mildom.com/");
}

function getTabUrl(tabId) {
  return new Promise(getUrl(10));

  function getUrl(time) {
    return function (resolve, reject) {
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

function toggleDisplayOfChatside() {
  const chatside = document.querySelector(
    "#root > div > div > div.container > div.content > div:nth-child(2)"
  );
  if (chatside) {
    const curerntDisplay = chatside.style.display;
    chatside.style.display = curerntDisplay === "none" ? "flex" : "none";
  }
}
