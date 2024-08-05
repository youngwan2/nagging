import { requestConfigBranch, type Method } from '@src/configs/fetch.config';
import { urlConfigs } from '@src/configs/url.config';

interface ServiceRequestProps {
  reqUrl: string;
  method: Method;
  token?: string;
  body?: any;
}
export async function commonService({
  reqUrl,
  method,
  token,
  body,
}: ServiceRequestProps) {
  const url = reqUrl.startsWith('http')
    ? reqUrl
    : urlConfigs.protocol + urlConfigs.host + reqUrl;
  const config =
    !token && body // 토큰은 없는데, 바디는 있는 경우
      ? requestConfigBranch(method, token, body)
      : token // 토큰 있는 경우
        ? requestConfigBranch(method, token, body)
        : { method };

  const response = await fetch(url, config);

  const result = await response.json();

  return result;
}
