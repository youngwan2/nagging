/** 1000 ~ 9999 까지 숫자 랜덤 생성 */
export function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1000;
}
