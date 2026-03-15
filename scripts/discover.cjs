const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const cols = ['id', 'name', 'status', 'user_id', 'media_url', 'age', 'age_range', 'age_group', 'gender', 'description', 'created_at'];
    for (const c of cols) {
        const { error } = await supabase.from('ads').select(c).limit(1);
        if (!error) console.log('EXISTS:' + c);
    }
}
run();
