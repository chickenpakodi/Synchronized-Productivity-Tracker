const BLOCKED_URL = 'www.youtube.com';
const REQUIRED_URL = 'leetcode.com';
const ONE_MINUTE = 60 * 1000; // 1 minute in milliseconds
const INTERVAL = 1000; // Check every second

let timeSpent = { blockedSite: 0, requiredSite: 0 };
let lastVisit = { blockedSite: null, requiredSite: null };
let isBlocked = false;
let currentUrl = '';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timeSpent: timeSpent, isBlocked: isBlocked });
  startTimer();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    currentUrl = tab.url;
    updateTimers();
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      currentUrl = tab.url;
      updateTimers();
    }
  });
});

function startTimer() {
  setInterval(updateTimers, INTERVAL);
}

function updateTimers() {
  let parsedUrl;
  try {
    parsedUrl = new URL(currentUrl);
  } catch (e) {
    console.error(`Invalid URL: ${currentUrl}`, e);
    return;
  }

  chrome.storage.sync.get(['timeSpent', 'isBlocked'], function (result) {
    timeSpent = result.timeSpent || timeSpent;
    isBlocked = result.isBlocked || isBlocked;

    if (parsedUrl.hostname.includes(BLOCKED_URL)) {
      if (lastVisit.blockedSite) {
        timeSpent.blockedSite += INTERVAL;
      }
      lastVisit.blockedSite = Date.now();
      if (timeSpent.blockedSite >= ONE_MINUTE) {
        isBlocked = true;
      }
    } else if (parsedUrl.hostname.includes(REQUIRED_URL)) {
      if (lastVisit.requiredSite) {
        timeSpent.requiredSite += INTERVAL;
      }
      lastVisit.requiredSite = Date.now();
      if (timeSpent.requiredSite >= ONE_MINUTE) {
        isBlocked = false;
        timeSpent = { blockedSite: 0, requiredSite: 0 }; // Reset timers after unblocking
      }
    } else {
      if (lastVisit.blockedSite) {
        timeSpent.blockedSite += Date.now() - lastVisit.blockedSite;
        lastVisit.blockedSite = null;
      }
      if (lastVisit.requiredSite) {
        timeSpent.requiredSite += Date.now() - lastVisit.requiredSite;
        lastVisit.requiredSite = null;
      }
    }

    chrome.storage.sync.set({ timeSpent: timeSpent, isBlocked: isBlocked });

    if (isBlocked && parsedUrl.hostname.includes(BLOCKED_URL)) {
      chrome.tabs.update({ url: 'blocked.html' });
    }
  });
}
