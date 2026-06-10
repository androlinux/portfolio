async function run() {
  try {
    console.log('Fetching portrait-default.jpg from Vite dev server...');
    const response = await fetch('http://localhost:5173/portrait-default.jpg');
    console.log('Response status:', response.status);
    console.log('Response content-type:', response.headers.get('content-type'));
    const buffer = await response.arrayBuffer();
    console.log('Image content size:', buffer.byteLength, 'bytes');
  } catch (err) {
    console.error('Failed to fetch portrait-default.jpg:', err);
  }
}

run();
