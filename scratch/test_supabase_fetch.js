const supabaseUrl = 'https://graqvzlaguxskamupvtb.supabase.co';
const supabaseAnonKey = 'sb_publishable_3Fy9v9eVtMUhkuCDEDsT1w_TJJbfSit';

async function run() {
  const start = Date.now();
  try {
    console.log('Querying database via Fetch REST API...');
    const url = `${supabaseUrl}/rest/v1/portfolio_state?id=eq.1&select=*`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    const end = Date.now();
    console.log(`Fetch finished in ${end - start}ms`);
    if (!response.ok) {
      console.error('Fetch error status:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response text:', text);
    } else {
      const data = await response.json();
      console.log('Data fetched successfully. Rows count:', data ? data.length : 0);
      if (data && data[0]) {
        const row = data[0];
        console.log('Data keys:', Object.keys(row));
        console.log('Photo length:', row.photo ? row.photo.length : 0);
      }
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

run();
