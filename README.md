# Synchronized Productivity Tracker App

## Project Overview
The Synchronized Productivity Tracker App is a Chrome extension designed to enhance productivity by tracking time spent on social media and coding websites. It automatically blocks access to YouTube until a predefined coding duration is achieved, helping users overcome distractions and maintain focus during critical study or work sessions.

## Features
- **Time Tracking**: Monitors the time spent on specified websites, providing users with insights into their online habits.
- **Dynamic Blocking**: Automatically blocks YouTube based on user-defined coding time, promoting effective time management.
- **Persistent Storage**: Utilizes Chrome's storage.sync API to remember time data and blocking status across browser sessions.
- **User-Friendly Interface**: Intuitive design with easy navigation and setup.

## File Structure
### 1. **manifest.json**
   - **Purpose**: This file defines the Chrome extension's configuration and permissions.
      - **permissions**: Grants access to necessary Chrome APIs (tabs, storage, webNavigation) to check URLs and store timer values.
      - **background.service_worker**: Points to the background script (`background.js`), which runs persistently to manage extension functionality.
      - **action.default_popup**: Specifies the HTML file for the popup that appears when the extension icon is clicked.

### 2. **background.js**
   - **Purpose**: The main script that handles background operations, including monitoring active tabs and enforcing the blocking mechanism.
   - **Key Concepts**:
      - **Chrome APIs**: Utilizes the tabs, storage, and webNavigation APIs to interact with browser tabs, store time data, and detect navigation events.
      - **Timers**: Implements JavaScript intervals to track the time spent on YouTube and LeetCode, updating every second (INTERVAL = 1000).
      - **URL Parsing**: Uses `new URL(currentUrl)` to extract the hostname of the current tab and check if it matches `youtube.com` or `leetcode.com`.

### 3. **popup.html**
   - **Purpose**: The HTML file for the extension's popup interface, displaying current tracking data and controls for the user.
   - **Functionality**: Provides visual feedback on time spent on each site and options to start or reset timers.

## Key Concepts
- **Chrome APIs**: Interact with browser tabs and manage storage using Chrome's built-in APIs.
- **Sync Storage**: Leverages Chrome's storage.sync API to retain data about time spent on websites and the blocking status of YouTube, ensuring the extension remembers the user's preferences even after browser restarts.

## Getting Started
1. Clone the repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.
5. Pin the extension to your toolbar and start tracking your productivity!

## Conclusion
The Synchronized Productivity Tracker App aims to help users manage their time effectively, providing tools to minimize distractions and optimize focus. By utilizing Chrome's APIs and user-friendly design, this extension serves as a powerful ally in achieving productivity goals.
