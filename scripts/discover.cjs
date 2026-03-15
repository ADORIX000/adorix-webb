const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const table = 'analytics';
    const { error } = await supabase.from(table).select('*').limit(1);
    console.log(table + ':' + (error ? 'ERROR: ' + error.message : 'EXISTS'));
}
run();
