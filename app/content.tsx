/* eslint-disable react-refresh/only-export-components */
import { DevTool } from "@/components/dev-tool";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    let isVisible = false;

    const ui = await createShadowRootUi(ctx, {
      name: "dev-tool-ui",
      position: "inline",
      anchor: "body",
      append: "last",
      onMount: (container) => {
        // Create wrapper with fixed positioning
        const wrapper = document.createElement("div");
        wrapper.style.cssText =
          "position: fixed; bottom: 20px; right: 20px; z-index: 999999;";
        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<DevTool />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    // Listen for toggle messages from background script
    browser.runtime.onMessage.addListener((message) => {
      if (message.type === "TOGGLE_DEVTOOL") {
        if (isVisible) {
          ui.remove();
        } else {
          ui.mount();
        }
        isVisible = !isVisible;
      }
    });

    // Don't mount automatically - wait for user to click extension icon
  },
});
