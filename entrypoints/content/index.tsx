import ReactDOM from "react-dom/client";
import { DevTool } from "./dev-tool";
import "./content/style.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
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

    ui.mount();
  },
});
