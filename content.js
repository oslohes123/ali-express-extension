chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTotalSpent") {
        // Recalculate the total spent
        let totalSpent = Array.from(
            document.querySelectorAll(".order-item-content-opt-price-total")
        )
            .map((element) => parseFloat(element.outerText.match(/\d+.\d+/)))
            .reduce((total, current) => (total += current), 0);
        totalSpent = totalSpent.toFixed(2);

        // Send the result back to the popup
        sendResponse({ totalSpent: totalSpent });
    }
});

