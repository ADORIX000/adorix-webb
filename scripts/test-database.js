const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

async function testDatabase() {
    console.log('--- Supabase Configuration Test ---');
    console.log('URL:', supabaseUrl ? 'Found' : 'MISSING');
    console.log('Key:', supabaseKey ? 'Found' : 'MISSING');

    if (!supabaseUrl || !supabaseKey) {
        console.error('Error: Missing environment variables.');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Test Database Connection
    console.log('\n1. Testing Database Connection...');
    try {
        const { data, error, count } = await supabase
            .from('ads')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;
        console.log('✅ Success: Able to connect to "ads" table.');
        console.log(`Current row count: ${count}`);
    } catch (err) {
        console.error('❌ Database Error:', err.message);
    }

    // 2. Test Storage Bucket
    console.log('\n2. Testing Storage Bucket...');
    try {
        const { data, error } = await supabase.storage
            .from('adorix-ads-media')
            .list('', { limit: 1 });

        if (error) throw error;
        console.log('✅ Success: Able to access "adorix-ads-media" bucket.');
    } catch (err) {
        console.error('❌ Storage Error:', err.message);
    }

    console.log('\n--- Test Complete ---');
}

testDatabase();
