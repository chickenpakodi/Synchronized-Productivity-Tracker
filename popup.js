let youtubeElapsedTime = 0; // Time spent on YouTube
let leetcodeElapsedTime = 0; // Time spent on LeetCode
let youtubeInterval; // Timer interval for YouTube
let leetcodeInterval; // Timer interval for LeetCode

document.addEventListener('DOMContentLoaded', () => {
  const youtubeTimerElem = document.getElementById('youtube-timer');
  const leetcodeTimerElem = document.getElementById('leetcode-timer');
  const statusElem = document.getElementById('status');

  // Get the blocked status and times from storage
  chrome.storage.sync.get(['timeSpent', 'isBlocked'], (data) => {
    const { timeSpent, isBlocked } = data;

    // Update elapsed time based on storage data
    youtubeElapsedTime = Math.floor(timeSpent.blockedSite / 1000);
    leetcodeElapsedTime = Math.floor(timeSpent.requiredSite / 1000);
    
    // Update the displayed time for both timers
    youtubeTimerElem.textContent = formatTime(youtubeElapsedTime);
    leetcodeTimerElem.textContent = formatTime(leetcodeElapsedTime);
    statusElem.textContent = isBlocked ? 'Blocked' : 'Unblocked';

    // Start YouTube timer if blocked
    if (isBlocked) {
      youtubeInterval = setInterval(() => {
        youtubeElapsedTime++;
        youtubeTimerElem.textContent = formatTime(youtubeElapsedTime);
      }, 1000);
    }
  });

  // Add listener for tab updates to manage timers
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      const url = new URL(tab.url);
      if (url.hostname.includes('youtube.com')) {
        // Start YouTube timer
        clearInterval(leetcodeInterval); // Stop LeetCode timer
        youtubeElapsedTime = Math.floor(timeSpent.blockedSite / 1000); // Reset elapsed time
        youtubeInterval = setInterval(() => {
          youtubeElapsedTime++;
          youtubeTimerElem.textContent = formatTime(youtubeElapsedTime);
        }, 1000);
      } else if (url.hostname.includes('leetcode.com')) {
        // Start LeetCode timer
        clearInterval(youtubeInterval); // Stop YouTube timer
        leetcodeElapsedTime = Math.floor(timeSpent.requiredSite / 1000); // Reset elapsed time
        leetcodeInterval = setInterval(() => {
          leetcodeElapsedTime++;
          leetcodeTimerElem.textContent = formatTime(leetcodeElapsedTime);
        }, 1000);
      } else {
        // Stop both timers if on a different site
        clearInterval(youtubeInterval);
        clearInterval(leetcodeInterval);
      }
    }
  });

  // Format time in MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
});
