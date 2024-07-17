import { requestConfigBranch, type Method } from '@src/configs/fetch.config';
import { urlConfigs } from '@src/configs/url.config';

interface ServiceRequestProps {
  reqUrl: string;
  method: Method;
  token?: string;
  body: any;
}
export async function commonService({
  reqUrl,
  method,
  token,
  body,
}: ServiceRequestProps) {
  const url = urlConfigs.protocol + urlConfigs.host + reqUrl;
  const config = requestConfigBranch(method, token, body);
  const response = await fetch(url, config);
  const result = await response.json();

  return result;
}
