// Polyfill to support both Chrome and Firefox
if (typeof browser === "undefined") {
    var browser = chrome;
}

// Check the active tab to ensure it's AliExpress
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0];

    if (tab.url.includes("aliexpress.com")) {
        // Inject the content script into the current tab
        browser.scripting.executeScript(
            {
                target: { tabId: tab.id },
                files: ["content.js"],
            },
            () => {
                // Once the content script is injected, send a message to retrieve the total spent
                chrome.tabs.sendMessage(
                    tab.id,
                    { action: "getTotalSpent" },
                    function (response) {
                        if (response && response.totalSpent !== undefined) {
                            // Update the popup UI with the total spent
                            document.querySelector(".spent").textContent =
                                response.totalSpent;
                        } else {
                            document.querySelector(".spent").textContent =
                                "Error retrieving data";
                        }
                    }
                );
            }
        );
    } else {
        document.querySelector(".spent").textContent = "Not on AliExpress";
    }
});

