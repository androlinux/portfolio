async function run() {
  try {
    console.log('Fetching local dev server homepage...');
    const response = await fetch('http://localhost:5173/');
    console.log('Response status:', response.status);
    console.log('Response content-type:', response.headers.get('content-type'));
    const text = await response.text();
    console.log('HTML length:', text.length);
    console.log('HTML contains main.js:', text.includes('/src/main.js'));
  } catch (err) {
    console.error('Failed to connect to dev server:', err);
  }
}

run();
