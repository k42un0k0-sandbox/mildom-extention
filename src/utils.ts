import { Message } from "./messages";

export function broadcastMessage(message: Message) {
  chrome.runtime.sendMessage(message);
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
}
