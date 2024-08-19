export const urlConfigs = {
  protocol: process.env.NODE_ENV === 'production' ? 'https://' : 'http://',
  host: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_HOST || '' : 'localhost:3000',
};
