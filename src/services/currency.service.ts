export async function getCurrencyByUsd() {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('환율 데이터 조회 실패: ' + error.cause);
    }
  }
}
