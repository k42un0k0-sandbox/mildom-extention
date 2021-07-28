import { Message, toggleChat } from "./messages";

chrome.runtime.onMessage.addListener((message: Message) => {
  switch (message.type) {
    case toggleChat.type:
      chrome.storage.local.get({ selector: "" }, ({ selector }) => {
        toggleDisplayBySelector(selector);
      });
  }
});

function toggleDisplayBySelector(selector: string) {
  const chatside = document.querySelector(selector) as HTMLElement;
  if (chatside) {
    const curerntDisplay = chatside.style.display;
    chatside.style.display = curerntDisplay === "none" ? "flex" : "none";
  }
}
