/** 메소드 열거체 */
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/** 오직 GET 요청 시 사용되는 구성 */
const onlyGetRequestConfig = (method: 'GET', token?: string) => {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

/** GET 요청 이 외의 Rest api 요청 시 사용되는 구성 */
const restRequestConfig = (method: Method, token?: string, body?: any) => {
  // 토큰은 없고, 바디는 있음
  if (!token && body) {
    return {
      method: method,
      body: JSON.stringify(body),
    };
  }

  // 토큰은 있지만 바디는 없음
  if (token && !body) {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  }

  // 토큰도 없고, 바디도 없음
  if (!token && !body) {
    return {
      method: method,
    };
  }

  // 그 외
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}  `,
    },
    body: JSON.stringify(body),
  };
};

/** 요청 구성을 분기처리 */
export function requestConfigBranch(method: Method, token?: string, body?: any) {
  return method === 'GET' ? onlyGetRequestConfig('GET', token) : restRequestConfig(method, token, body);
}
