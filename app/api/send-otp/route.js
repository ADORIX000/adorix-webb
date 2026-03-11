import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    try {
        const { error } = await supabase
            .from('otps')
            .upsert({ email, code: otp, expires_at: expiresAt }, { onConflict: 'email' });

        if (error) throw error;

        // --- EMAIL SENDING LOGIC ---
        console.log(`[OTP DEBUG] Sending OTP ${otp} to ${email}`);

        return NextResponse.json({ success: true, message: 'OTP sent' });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
