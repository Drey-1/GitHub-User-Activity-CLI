# GitHub User Activity
Idea: https://roadmap.sh/projects/github-user-activity

This script uses the GitHub API to fetch a user's events and display formatted messages that describe each activity.

## Overview

The code defines an object called 'EVENT_MESSAGES' that maps GitHub event types to functions that generate descriptive messages for each event type. Then the asynchronous function 'searcher()':

- Takes a GitHub username as an argument on the command line.
- Fetches that user's events through the GitHub API.
- Check for recent activity.
- For each event, uses the corresponding function in 'EVENT_MESSAGES' to display a formatted message.
- If the event type does not have a defined function, displays a default message informing the type of action and the repository.

## Usage
Run the github-activity command followed by a user name:
```sh
npm run github-activity <username> 
```
## 🛠 Technologies Used

- Node.js
- GitHub API

## 📜 License

This project is licensed under the [MIT License](LICENSE).
