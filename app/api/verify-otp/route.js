import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
    const { userId } = await auth();
    const user = await currentUser();
    const { code } = await req.json();

    if (!userId || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;

    try {
        const { data, error } = await supabase
            .from('otps')
            .select('code, expires_at')
            .eq('email', email)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: 'OTP not found or expired' }, { status: 400 });
        }

        if (new Date(data.expires_at) < new Date()) {
            return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
        }

        if (data.code !== code) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        // Clear OTP after successful verification
        await supabase.from('otps').delete().eq('email', email);

        return NextResponse.json({ success: true, message: 'OTP verified' });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
