const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function inspectSchema() {
    console.log('--- Supabase Schema Inspection ---');
    
    if (!supabaseUrl || !supabaseKey) {
        console.error('Error: Missing environment variables.');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('\nAttempting to fetch one row with all columns...');
    const { data, error: selectError } = await supabase.from('ads').select('*').limit(1);

    if (selectError) {
        console.error('❌ Error selecting ALL columns:', selectError.message);
    } else if (data && data.length > 0) {
        console.log('✅ Success! Columns found:', Object.keys(data[0]));
    } else {
        console.log('ℹ️ Table "ads" is empty. Testing common column names individually...');
        
        const possibleColumns = ['id', 'name', 'status', 'user_id', 'media_url', 'age', 'age_range', 'gender', 'description'];
        
        for (const col of possibleColumns) {
            const { error } = await supabase.from('ads').select(col).limit(1);
            if (error) {
                console.log(`❌ Column "${col}": Not found`);
            } else {
                console.log(`✅ Column "${col}": EXISTS`);
            }
        }
    }

    console.log('\n--- Inspection Complete ---');
}

inspectSchema();
