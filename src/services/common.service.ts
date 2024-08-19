import { requestConfigBranch, type Method } from '@src/configs/fetch.config';
import { urlConfigs } from '@src/configs/url.config';

interface ServiceRequestProps {
  reqUrl: string;
  method: Method;
  token?: string;
  body?: any;
}
export async function commonService({ reqUrl, method, token, body }: ServiceRequestProps) {
  const cdn = 'cdn';
  const defaultUrl = urlConfigs.protocol + urlConfigs.host + reqUrl;
  const url = reqUrl.includes(cdn) ? reqUrl : defaultUrl;

  console.log('요청받은 주소:', url);
  const config =
    !token && body // 토큰은 없는데, 바디는 있는 경우
      ? requestConfigBranch(method, token, body)
      : token // 토큰 있는 경우
        ? requestConfigBranch(method, token, body)
        : { method };

  const response = await fetch(url, config);

  if (!response.ok) return { message: '데이터 조회에 실패하였습니다.' };

  const result = await response.json();
  return result;
}
