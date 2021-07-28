import { useEffect, useState } from "react";
import { toggleChat } from "../messages";
import { broadcastMessage } from "../utils";

export default function App() {
  const [selector, setSelector] = useState("");
  useEffect(() => {
    chrome.storage.local.get({ selector }, ({ selector }) => {
      setSelector(selector);
    });
  }, []);
  const onClick = () => {
    broadcastMessage(toggleChat);
  };
  return (
    <div style={{ padding: 20 }}>
      <button style={{ marginBottom: 20 }} onClick={onClick}>
        トグルする
      </button>
      <div>
        <label htmlFor="selector">チャット欄のセレクター</label>
        <input
          id="selector"
          value={selector}
          onChange={(e) => {
            setSelector(e.target.value);
            chrome.storage.local.set({ selector: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
