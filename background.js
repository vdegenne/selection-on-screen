const tabsRelationMap = []
function addToRelationMap (tabId, parentTabId, windowId) {
  tabsRelationMap.push([tabId, parentTabId, windowId])
}
chrome.tabs.onRemoved.addListener(async function (tabId, removeInfo) {
  tabsRelationMap.reverse()
  const relationIndex = tabsRelationMap.findIndex(r=>r[0]==tabId)
  if (relationIndex >= 0) {
    const parentId = tabsRelationMap[relationIndex][1] // parent
    // @TODO should check if the parent tab still exist before trying to udpate
    chrome.tabs.update(parentId, {active: true})
  }
  tabsRelationMap.slice(relationIndex, 1)
  tabsRelationMap.reverse()
})

chrome.commands.onCommand.addListener(async function (command) {
  if (command == 'displaySelectionOnScreen') {
    const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
    // const newTab = await chrome.tabs.create({
    //   url: 'https://www.google.fr'
    // });
    // addToRelationMap(newTab.id, currentTab.id, currentTab.windowId)
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: function () {
        const characterFrame = document.querySelector('#movable-character-frame')
        characterFrame.displaySelection()
        // characterFrame.innerText = 'test'
      }
    })
  }
})