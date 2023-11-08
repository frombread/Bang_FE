# 클라이언트 애플리케이션을 위한 Dockerfile
# Node.js 베이스 이미지
FROM node:21.1.0

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일들 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install --frozen-lockfile

# 나머지 소스 파일들 복사
COPY . .

# React 앱 빌드
RUN npm run build

# 전역으로 serve 패키지를 설치합니다.
RUN npm -g add serve

# 3000 포트를 노출합니다.
EXPOSE 3000

# serve를 사용하여 빌드된 앱을 서빙합니다.
CMD ["serve", "-s", "build", "-l", "3000"]