# 경량 Alpine Linux 기반의 Node.js 이미지를 사용(본인이 사용하는 환경에 맞게)
FROM node:20-alpine 

# 컨테이너 내에서 /app 디렉토리를 작업 디렉토리로 설정
WORKDIR /app

# 나머지 소스코드(.)를 모두 /app(.) 으로 복사
COPY . .

# package.json과 package-lock.json 파일을 작업 디렉토리(/app)로 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 빌드
RUN npm run build

# 컨테이너를 노출할 포트 번호
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]