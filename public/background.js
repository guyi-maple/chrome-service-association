// eslint-disable-next-line no-undef
chrome.action.onClicked.addListener((tab) => {
    // eslint-disable-next-line no-undef
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: function () {
            window.showAssociationModal()
        }
    });
});