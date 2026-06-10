import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://graqvzlaguxskamupvtb.supabase.co';
const supabaseAnonKey = 'sb_publishable_3Fy9v9eVtMUhkuCDEDsT1w_TJJbfSit';

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const start = Date.now();
  try {
    console.log('Querying database...');
    const { data, error } = await supabase
      .from('portfolio_state')
      .select('*')
      .eq('id', 1);

    const end = Date.now();
    console.log(`Query finished in ${end - start}ms`);
    if (error) {
      console.error('Error:', error);
    } else if (data && data[0]) {
      const row = data[0];
      console.log('Data keys:', Object.keys(row));
      console.log('Data (text representation length):', JSON.stringify(row.data).length);
      console.log('Links (text representation length):', JSON.stringify(row.links).length);
      console.log('Photo length:', row.photo ? row.photo.length : 0);
      if (row.photo) {
        console.log('Photo starts with:', row.photo.substring(0, 100));
      }
    } else {
      console.log('No data returned.');
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

run();
