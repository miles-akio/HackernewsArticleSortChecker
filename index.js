// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { webkit } = require("playwright");

async function sortHackerNewsArticles() {
  // launch WebKit browser in headless mode as alternative
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News newest page
  await page.goto("https://news.ycombinator.com/newest");

  // wait for the articles to load
  await page.waitForSelector('.athing');

  // get all article elements with class 'athing'
  const articles = await page.$$('.athing');

  // validate that there are exactly 100 articles
  if (articles.length !== 100) {
    console.error(`Expected 100 articles, but found ${articles.length}`);
    await browser.close();
    process.exit(1);
  }

  // extract the article ids in the order they appear on the page
  // the 'id' attribute of each article element is a numeric string representing the article id
  const articleIds = await Promise.all(
    articles.map(async (article) => {
      return await article.getAttribute('id');
    })
  );

  // convert articleIds to numbers for comparison
  const articleIdsNum = articleIds.map(id => parseInt(id, 10));

  // check if the article ids are sorted from newest to oldest (descending order)
  // Hacker News article ids increment over time, so higher id means newer article
  for (let i = 0; i < articleIdsNum.length - 1; i++) {
    if (articleIdsNum[i] < articleIdsNum[i + 1]) {
      console.error('Articles are not sorted from newest to oldest.');
      await browser.close();
      process.exit(1);
    }
  }

  console.log('Validation passed: Exactly 100 articles are sorted from newest to oldest.');

  // close browser
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
