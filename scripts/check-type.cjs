const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    console.log('--- Inspecting ads table schema ---');
    
    // Check column types using a raw RPC or just metadata if possible
    // Since we can't easily run raw SQL from client, we'll try to insert a non-uuid string 
    // and see the error message detail if it fails.
    
    const { data, error } = await supabase
        .from('ads')
        .insert([{ user_id: 'test_string_not_uuid', status: 'test' }])
        .select();

    if (error) {
        console.log('Insert Test Result: FAILED');
        console.log('Error Code:', error.code);
        console.log('Error Message:', error.message);
    } else {
        console.log('Insert Test Result: SUCCESS (Column is likely TEXT)');
    }
}
inspect();
