## 구현한 방법

- 초기에 시드 데이터를 넣어 놓고, 처음 실행시 빈 화면이 보이지 않게 구현
- 데이터베이스는  환자정보, 기저질환, 통증부위 3개의 스키마로 구성
    - 기저 질환과 통증 부위 목록은 클라이언트 사이드에서 수정과 추가가 불가능하게 구현
- restAPI를 통해 서버와 클라이언트간의 통신을 구현
- React Query 라이브러리를 활용해서 기저 질환과 통증부위를 불러오는 부분을 캐싱
    - 데이터에 대한 불필요한 중복 요청을 방지

## 어려웠던 점

- 검색 기능 활용시 페이지 내에서만 검색되는 문제를 해결하는 과정
- 프론트 구현중에 모달이랑 조회하고 수정하는 컨포넌트 구조를 설계하는 부분
- 실행 환경에 따라 달라질 수 있는 부분을 고려하면서 실행 방법을 작성하는 부분

# 실행 방법

## 두 가지 실행 방법 중 하나를 선택해서 실행

### 방법1: 도커 활용

> **사전 작업**:  docker desktop 실행
> 

```bash
# 레포지토리 클론
git clone https://github.com/frombread/Bang_FE
git clone https://github.com/frombread/Bang_BE
```

```bash
# 상위 디렉토리 생성
mkdir human_bang

# 복제한 레포를 새로 생성한 디렉토리로 이동
mv bang_FE human_bang/
mv bang_BE human_bang/
```

- BE 저장소에 있는 docker-compose.yaml 파일을 상위 디렉토리로 이동

```bash
cd human_bang
mv Bang_BE/docker-compose.yaml ./docker-compose.yaml
```

```bash
docker-compose up --build
```

```bash
http://localhost:8060 으로 접속
```

## 방법2: 직접 실행 방법 (로컬환경)

> **사전 작업**: mongoDB 실행 (27017포트)
> 

```bash
# 저장소를 복제합니다.
git clone https://github.com/frombread/Bang_FE
git clone https://github.com/frombread/Bang_BE
```

```bash
# Bang_BE 디렉토리로 이동
cd Bang_BE

# 필요한 라이브러리를 설치
npm install

# 시드 데이터 저장
npm run seed

# 프로그램 실행
npm run start
```

```bash
# 새로운 터미널에서 Bang_FE 디렉토리로 이동
cd Bang_FE

# 필요한 라이브러리를 설치
npm install

# 프로그램 실행
npm start
```

```bash
http://localhost:3000 으로 접속
```
