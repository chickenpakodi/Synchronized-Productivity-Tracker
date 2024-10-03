# Synchronized-Productivity-Tracker
• Storage:/n
o Chrome's storage.sync is used to persist the amount of time spent on both websites and
whether YouTube is blocked (isBlocked).
manifest.json
• Purpose: It defines the Chrome extension’s configuration and permissions.
o permissions: Grants access to tabs, storage, and webNavigation, which are needed for
checking URLs and storing timer values.
o background.service_worker: This refers to the background script (background.js) which
runs persistently.
o action.default_popup: Specifies the popup's HTML file that appears when clicking the
extension icon.
Key Concepts:
• Chrome APIs: You're using the tabs, storage, and webNavigation APIs to interact with
browser tabs, store time data, and detect navigation events (such as when a user changes tabs).
• Timers: You're using JavaScript intervals to keep track of the time spent on YouTube and
LeetCode, which are updated every second (INTERVAL = 1000).
• URL Parsing: new URL(currentUrl) is used to extract the hostname of the current tab, to see
if it's youtube.com or leetcode.com.
• Sync Storage: Data about the time spent on websites and whether YouTube is blocked is
stored using Chrome's storage.sync API. This allows the extension to remember the state even
after browser restarts
