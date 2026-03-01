const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=55',
    'https://sanand0.github.io/tdsdata/js_table/?seed=56',
    'https://sanand0.github.io/tdsdata/js_table/?seed=57',
    'https://sanand0.github.io/tdsdata/js_table/?seed=58',
    'https://sanand0.github.io/tdsdata/js_table/?seed=59',
    'https://sanand0.github.io/tdsdata/js_table/?seed=60',
    'https://sanand0.github.io/tdsdata/js_table/?seed=61',
    'https://sanand0.github.io/tdsdata/js_table/?seed=62',
    'https://sanand0.github.io/tdsdata/js_table/?seed=63',
    'https://sanand0.github.io/tdsdata/js_table/?seed=64'
  ];

  let grandTotal = 0;

  for (const url of urls) {
    console.log(`Scraping ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for tables to load (dynamic content)
    await page.waitForSelector('table');
    
    // Extract all text from table cells, filter numbers
    const numbers = await page.evaluate(() => {
      const cells = document.querySelectorAll('table td, table th');
      return Array.from(cells)
        .map(cell => parseFloat(cell.textContent.trim()))
        .filter(num => !isNaN(num));
    });

    const pageSum = numbers.reduce((sum, num) => sum + num, 0);
    grandTotal += pageSum;
    console.log(`Page sum: ${pageSum.toFixed(2)}`);
  }

  console.log(`\n🎉 GRAND TOTAL SUM OF ALL TABLES: ${grandTotal.toFixed(2)}`);
  await browser.close();
})();
