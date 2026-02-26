/**
 * Utility to handle Google OAuth 2.0 authentication redirect.
 * 
 * To fully enable this:
 * 1. Create a project in the Google Cloud Console (https://console.cloud.google.com/)
 * 2. Set up an OAuth 2.0 Client ID
 * 3. Add your authorized redirect URIs
 * 4. Replace the GOOGLE_CLIENT_ID placeholder below with your actual Client ID
 */

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const REDIRECT_URI = window.location.origin + '/dashboard'; // Redirecting to dashboard after login

export const handleGoogleLogin = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: REDIRECT_URI,
        client_id: GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };

    const qs = new URLSearchParams(options).toString();

    window.location.href = `${rootUrl}?${qs}`;
};
