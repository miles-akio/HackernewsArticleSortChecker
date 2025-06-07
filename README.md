# Hacker News Article Sort Checker

## Project Description

This project is a Node.js script that uses Microsoft's Playwright framework to validate the sorting order of the newest articles on Hacker News. The script navigates to the Hacker News "newest" page, extracts exactly 100 articles, and verifies that they are sorted from newest to oldest based on their article IDs.

This tool can be useful for QA engineers, developers, or anyone interested in verifying the integrity and sorting of Hacker News articles programmatically.

---

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm (Node package manager)
- Internet connection to access Hacker News website

---

## Installation

1. Clone or download this repository to your local machine.

2. Open a terminal in the project directory.

3. Install the required node modules by running:

```bash
npm install
```

4. Install Playwright browsers (Chromium, Firefox, WebKit) by running:

```bash
npx playwright install
```

---

## Usage

Run the script using Node.js:

```bash
node index.js
```

The script will launch a headless WebKit browser, navigate to the Hacker News newest page, and perform the validation. It will log the result to the console:

- If exactly 100 articles are found and sorted correctly, it will log a success message.
- If the number of articles is not 100 or the sorting order is incorrect, it will log an error message and exit.

---

## How the Script Works: Step-by-Step Explanation

1. **Import Playwright WebKit module**

```javascript
const { webkit } = require("playwright");
```

The script uses the WebKit browser engine from Playwright to run the browser automation.

2. **Launch the browser in headless mode**

```javascript
const browser = await webkit.launch({ headless: true });
```

This starts a WebKit browser instance without a visible UI.

3. **Create a new browser context and page**

```javascript
const context = await browser.newContext();
const page = await context.newPage();
```

A new browser context isolates the session, and a new page is opened for navigation.

4. **Navigate to Hacker News newest page**

```javascript
await page.goto("https://news.ycombinator.com/newest");
```

The script directs the browser to the Hacker News newest articles page.

5. **Wait for articles to load**

```javascript
await page.waitForSelector(".athing");
```

Waits until at least one article element with class `athing` is present in the DOM.

6. **Select all article elements**

```javascript
const articles = await page.$$(".athing");
```

Retrieves all article elements on the page.

7. **Validate the number of articles**

```javascript
if (articles.length !== 100) {
  console.error(`Expected 100 articles, but found ${articles.length}`);
  await browser.close();
  process.exit(1);
}
```

Checks that exactly 100 articles are present; otherwise, logs an error and exits.

8. **Extract article IDs**

```javascript
const articleIds = await Promise.all(
  articles.map(async (article) => {
    return await article.getAttribute("id");
  })
);
```

Gets the `id` attribute of each article element, which represents the article's unique numeric ID.

9. **Convert IDs to numbers**

```javascript
const articleIdsNum = articleIds.map((id) => parseInt(id, 10));
```

Converts the string IDs to integers for comparison.

10. **Check sorting order**

```javascript
for (let i = 0; i < articleIdsNum.length - 1; i++) {
  if (articleIdsNum[i] < articleIdsNum[i + 1]) {
    console.error("Articles are not sorted from newest to oldest.");
    await browser.close();
    process.exit(1);
  }
}
```

Verifies that the article IDs are in descending order, meaning the newest articles appear first.

11. **Log success and close browser**

```javascript
console.log(
  "Validation passed: Exactly 100 articles are sorted from newest to oldest."
);
await browser.close();
```

If all checks pass, logs a success message and closes the browser.

---

## Troubleshooting Tips

- If you encounter errors related to missing Playwright browser executables, run:

```bash
npx playwright install
```

- Ensure your system permissions and antivirus settings allow Playwright to install and run browser binaries.

- If the script fails due to network issues, verify your internet connection.

- For debugging, you can modify the script to launch the browser in headed mode by changing:

```javascript
const browser = await webkit.launch({ headless: false });
```

This will open a visible browser window to observe the script's actions.

---

## Author

Created by Miles Shinmachi
