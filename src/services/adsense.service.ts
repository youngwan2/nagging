import { urlConfigs } from '@src/configs/url.config';

/** 메소드 열거체 */
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface AdsenseServiceRequest {
  reqUrl: string;
  method: Method;
  token: string;
  body: any;
}
export async function adsenseService({
  reqUrl,
  method,
  token,
  body,
}: AdsenseServiceRequest) {
  const url = urlConfigs.protocol + urlConfigs.host + reqUrl;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}  `,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('adsenseService 에러 발생:', error);
  }
}
