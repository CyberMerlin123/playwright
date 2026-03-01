const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // The seeds provided in your task
  const seeds = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
  let totalSum = 0;

  for (const seed of seeds) {
    // Assuming the URL structure based on the "Seed" pattern
    const url = `https://datadash-qa-reports.vercel.app/seed/${seed}`; 
    try {
      await page.goto(url);
      
      // Select all table cells (td) containing numbers
      const values = await page.$$eval('td', cells => 
        cells.map(cell => parseFloat(cell.innerText)).filter(num => !isNaN(num))
      );
      
      const pageSum = values.reduce((a, b) => a + b, 0);
      totalSum += pageSum;
      console.log(`Seed ${seed} sum: ${pageSum}`);
    } catch (error) {
      console.error(`Failed to scrape Seed ${seed}:`, error.message);
    }
  }

  console.log(`FINAL_TOTAL_SUM: ${totalSum}`);
  await browser.close();
})();
