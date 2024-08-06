export async function tokenRefresh(refreshToken: string) {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID!,
        client_secret: process.env.AUTH_GOOGLE_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: refreshToken as string,
      }),
      method: 'POST',
    });

    const responseTokens = await response.json();
    const newAccessToken = responseTokens.access_token;

    return newAccessToken;
  } catch (error) {
    console.error(error);
    return false;
  }
}
