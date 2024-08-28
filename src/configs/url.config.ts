const host = process.env.NEXT_PUBLIC_HOST || 'nagging.site';

export const urlConfigs = {
  protocol: process.env.NODE_ENV === 'production' ? 'https://' : 'http://',
  host: process.env.NODE_ENV === 'production' ? host : 'localhost:3000',
};
