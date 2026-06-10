async function run() {
  try {
    console.log('Fetching compiled src/main.js from Vite dev server...');
    const response = await fetch('http://localhost:5173/src/main.js');
    console.log('Response status:', response.status);
    console.log('Response content-type:', response.headers.get('content-type'));
    const text = await response.text();
    console.log('JS content length:', text.length);
    console.log('JS sample (first 200 chars):');
    console.log(text.substring(0, 200));
  } catch (err) {
    console.error('Failed to fetch main.js:', err);
  }
}

run();
