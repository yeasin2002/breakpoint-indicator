export default defineBackground(() => {
  // Listen for extension icon clicks
  browser.action.onClicked.addListener(async (tab) => {
    if (!tab.id) return;

    // Send message to content script to toggle DevTool visibility
    try {
      await browser.tabs.sendMessage(tab.id, { type: "TOGGLE_DEVTOOL" });
    } catch (error) {
      // Content script might not be loaded yet on some pages
      console.warn("Could not send message to tab:", error);
    }
  });
});
