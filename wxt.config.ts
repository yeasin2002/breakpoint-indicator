import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/unocss", "@wxt-dev/auto-icons"],
  entrypointsDir: "app",
  manifest: {
    action: {}, // Empty action with no popup - enables browser.action.onClicked
  },
});
