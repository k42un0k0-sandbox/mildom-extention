chrome.tabs.onActivated.addListener(function (activeInfo) {
  changeIcon(activeInfo.tabId, 10);
});

function changeIcon(tabId, time) {
  if (time <= 0) return;
  console.log(`${time}`);

  chrome.tabs.get(tabId, (tab) => {
    if (tab == null) {
      setTimeout(() => {
        changeIcon(tabId, time - 1);
      }, 100);
      return;
    }
    if (tab.url.startsWith("https://www.mildom.com/")) {
      chrome.action.setIcon({ path: "icons/16.png" });
      chrome.action.onClicked.addListener(handleClick);
    } else {
      chrome.action.setIcon({ path: "icons/16-gray.png" });
      chrome.action.onClicked.removeListener(handleClick);
    }
  });
}

function handleClick(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleDisplayOfChatside,
  });
}

function toggleDisplayOfChatside() {
  const chatside = document.querySelector(
    "#root > div > div > div.container > div.content > div > div.chat-side"
  );
  if (chatside) {
    const curerntDisplay = chatside.style.display;
    chatside.style.display = curerntDisplay === "none" ? "flex" : "none";
  }
}
