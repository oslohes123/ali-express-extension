chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (typeof browser === "undefined") {
        var browser = chrome;
    }
    if (request.action === "getTotalSpent") {
        // Extract all prices and count items
        let prices = Array.from(
            document.querySelectorAll(".order-item-content-opt-price-total")
        ).map((element) => parseFloat(element.outerText.match(/\d+.\d+/)));
        
        let totalSpent = prices.reduce((total, current) => (total += current), 0).toFixed(2);
        let itemCount = prices.length; // Total number of items
        
        // Send the result back to the popup
        sendResponse({ totalSpent: totalSpent, itemCount: itemCount });
    }
});
