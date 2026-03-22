require("dotenv").config();
const supabase = require("./src/lib/supabase");

async function test() {
    const { data, error } = await supabase
        .from('payments')
        .insert({
            order_id: 'ORD-TEST-1234',
            user_id: 'user_2dKx1A',
            amount: 62,
            currency: 'LKR',
            status: 'PENDING',
            provider: 'PAYHERE',
            item_type: 'Subscription',
            item_id: 'plan_plus',
            customer_name: 'Test Customer',
            customer_email: 'test@example.com'
        });

    if (error) {
        console.error("Database Error:", error);
    } else {
        console.log("Success:", data);
    }
}

test();
