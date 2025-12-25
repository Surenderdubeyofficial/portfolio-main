import puppeteer from 'puppeteer';

(async () => {
  const candidateUrls = [process.env.TEST_URL, 'http://localhost:5174/', 'http://127.0.0.1:5174/', 'http://localhost:5173/'].filter(Boolean);

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // Forward page console and errors to our stdout for debugging
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQUEST FAILED:', req.url(), req.failure() && req.failure().errorText));

  let urlFound = null;

  for (const url of candidateUrls) {
    console.log(`Trying ${url} ...`);
    // wait for site to be reachable
    let reachable = false;
    for (let i = 0; i < 15; i++) {
      try {
        const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 5000 });
        if (res && res.status && res.status() < 400) {
          reachable = true;
          console.log(`Site reachable at ${url}`);
          urlFound = url;
          break;
        }
      } catch (err) {
        // not ready yet
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
    if (urlFound) break;
  }

  if (!urlFound) {
    console.error('Site not reachable at any candidate URL: ' + candidateUrls.join(', '));
    await browser.close();
    process.exit(1);
  }

  // Debug: dump page HTML snippet for inspection
  const html = await page.content();
  console.log('PAGE HTML SNIPPET (first 2000 chars):');
  console.log(html.slice(0, 2000));

  // Wait for React to render into #root
  try {
    await page.waitForSelector('#root > *', { timeout: 20000 });
    console.log('React app rendered into #root.');
  } catch (err) {
    console.error('React did not render within timeout.');
    const consoleLogs = await page.evaluate(() => (window.__RENDER_LOGS__ || ''));
    console.error('PAGE CONSOLE LOGS:', consoleLogs);
    await browser.close();
    process.exit(1);
  }

  try {
    // Wait for contact form inputs
    await page.waitForSelector('form input[name="from_name"]', { timeout: 15000 });

    await page.type('input[name="from_name"]', 'Puppeteer Test');
    await page.type('input[name="from_email"]', 'noreply+puppeteer@example.com');
    await page.type('textarea[name="message"]', 'This is an automated test message from Puppeteer to verify EmailJS configuration.');

    // Submit
    await page.click('button[type="submit"]');

    // Wait for either success or error message
    const result = await page.waitForFunction(() => {
      const txt = document.body.innerText;
      if (txt.includes('Message Sent Successfully')) return 'success';
      if (txt.includes('Unable to send message: Email service not configured')) return 'not_configured';
      if (txt.includes('Failed to send message')) return 'failed';
      return false;
    }, { timeout: 20000 });

    const status = await result.jsonValue();

    if (status === 'success') {
      console.log('TEST RESULT: Message Sent Successfully (EmailJS worked)');
    } else if (status === 'not_configured') {
      console.log('TEST RESULT: Email service not configured (check .env and EmailJS settings)');
    } else if (status === 'failed') {
      console.log('TEST RESULT: Failed to send message (EmailJS returned an error)');
    } else {
      console.log('TEST RESULT: Unknown response.');
    }

  } catch (err) {
    console.error('TEST ERROR:', err.message);
    // Capture page content for debugging
    try {
      const body = await page.evaluate(() => document.body.innerText);
      console.error('Page body snippet:', body.slice(0, 1000));
    } catch (e) {
      // ignore
    }
    await browser.close();
    process.exit(1);
  }

  await browser.close();
  process.exit(0);
})();
