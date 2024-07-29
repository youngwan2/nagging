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
  const config = token ? requestConfigBranch(method, token, body) : { method };

  const response = await fetch(url, config);
  const result = await response.json();

  return result;
}
