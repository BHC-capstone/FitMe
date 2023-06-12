# FitMe

<br>

![2023-1학기_캡스톤디자인_썸네일_4 BHC](https://github.com/BHC-capstone/FitMe/assets/86943988/4e5ab898-f979-45f5-90ff-7ffdaf88d56b)

<br>

'FitMe'는 비대면 헬스 케어(퍼스널 트레이닝)를 제공해주는 서비스입니다.
제공하는 기능들입니다

1. 트레이너와 수강생을 연결시켜주는 개인 맞춤형 트레이닝 진행
2. 트레이너 및 수강생 관리 대시보드
3. 개인 맞춤 운동 및 식단계획 서비스 운영
4. 트레이너 자격증 및 경력 정보 제공

이 프로젝트는 캡스톤 디자인 과목의 일환으로 5인으로 구성된 BHC팀이 개발하였습니다.

서비스 URL: https://fitme.p-e.kr:4000

시연 영상: https://drive.google.com/file/d/1enToxOaYWihNmt2jZmU92L42E3bCudiq/view?usp=share_link

<br>

# 팀원소개

---

| Role |  Name  | Part                           | Email              |
| :--: | :----: | :----------------------------- | :----------------- |
| 팀장 | 박진명 | 백엔드 개발, 전체 총괄         | pjm2476@ajou.ac.kr |
| 팀원 | 김재현 | 프론트엔드 개발                | kjh77k@ajou.ac.kr  |
| 팀원 | 김하현 | 프론트엔드 개발, 웹 퍼블리싱   | snloopy@ajou.ac.kr |
| 팀원 | 노유현 | 백엔드 개발, 데이터베이스 관리 | noryh@ajou.ac.kr   |
| 팀원 | 박범수 | 프론트엔드 개발                | poj4639@ajou.ac.kr |

<br>

## 사용 기술 스택

![image](https://github.com/BHC-capstone/FitMe/assets/86943988/c0e277cc-ffc7-46c7-96ef-bc2f1280e258)

### 프론트 서버

## Dependency

|             라이브러리              |  버전   |
| :---------------------------------: | :-----: |
|          @ant-design/icons          | @5.0.1  |
|  @fortawesome/fontawesome-svg-core  | @6.4.0  |
| @fortawesome/free-regular-svg-icons | @6.4.0  |
|  @fortawesome/free-solid-svg-icons  | @6.4.0  |
|   @fortawesome/react-fontawesome    | @0.2.0  |
|          @reduxjs/toolkit           | @1.9.5  |
|      @testing-library/jest-dom      | @5.16.5 |
|       @testing-library/react        | @13.4.0 |
|     @testing-library/user-event     | @13.5.0 |
|                antd                 | @5.4.6  |
|                axios                | @1.4.0  |
|           bootstrap-icons           | @1.10.5 |
|              bootstrap              | @5.2.3  |
|              cross-env              | @7.0.3  |
|        eslint-config-airbnb         | @19.0.4 |
|       eslint-config-prettier        | @8.8.0  |
|        eslint-plugin-import         | @2.27.5 |
|       eslint-plugin-jsx-a11y        | @6.7.1  |
|       eslint-plugin-prettier        | @4.2.1  |
|      eslint-plugin-react-hooks      | @4.6.0  |
|         eslint-plugin-react         | @7.32.2 |
|               eslint                | @8.38.0 |
|               history               | @5.3.0  |
|               jquery                | @3.6.4  |
|              prettier               | @2.8.7  |
|             prop-types              | @15.8.1 |
|           react-bootstrap           | @2.7.4  |
|           react-calendar            | @4.2.1  |
|          react-datepicker           | @4.11.0 |
|              react-dom              | @18.2.0 |
|            react-player             | @2.12.0 |
|             react-redux             | @8.0.5  |
|          react-router-dom           | @6.11.0 |
|            react-scripts            | @5.0.1  |
|      react-simple-star-rating       | @5.1.7  |
|                react                | @18.2.0 |
|      redux-devtools-extension       | @2.13.9 |
|            redux-persist            | @6.0.0  |
|  redux-persist5@npm:redux-persist   | @6.0.0  |
|            redux-promise            | @0.6.0  |
|             redux-thunk             | @2.4.2  |
|                redux                | @4.2.1  |
|                sass                 | @1.62.1 |
|          styled-components          | @5.3.10 |
|             web-vitals              | @2.1.4  |

### 백엔드 서버

![image](https://github.com/noyouhyun/Capstone/blob/main/%E1%84%82%E1%85%A9%E1%84%83%E1%85%B3.png)

<p align="center">
Node.js는 웹 브라우저 외부에서 JavaScript 코드를 실행할 수 있는 JavaScript 런타임 환경으로, 서버의 스크립팅 및 확장과 고성능 네트워크 응용프로그램 개발을 가능케 한다.</p>

<br>

### 프로젝트 설명

애자일 방법론 사용하였으며 iteration은 2주간격, scrum은 매주 두번 월요일, 목요일에 진행했습니다.

### iteration일정 및 product backlog

https://docs.google.com/spreadsheets/d/124Tb08xdwcXLAvX0HUlZS1Pkdn-8BDyxjXWtX4-o0rE/edit#gid=1714794367

### 프로젝트 구조(프론트엔드)

-   components : 여러 곳에서 사용되는 컴포넌트 파일들을 모아놓은 폴더
-   images : 프로젝트에서 사용되는 이미지 파일을 모아놓은 폴더
-   page : 라우팅될 페이지 파일을 모아놓은 폴더
-   redux : redux를 사용하기 위해 스토어 및 모듈을 모아놓은 폴더
-   scss : 스타일에 사용될 scss 파일을 모아놓은 폴더

### 프로젝트 구조(백엔드)

-   config : 설정파일
-   bin : 실행가능한 파일들
-   models : sequelize로 생성된 model 파일
-   node modules : node.js에서 프로젝트에서 사용되는 외부 패키지들
-   public : 정적파일 (js, css)
-   routes : router
-   modules : module 파일
    -   s3upload : amazons3 upload 파일

### 전체 프로젝트 구조

![2023-1학기_FitMe(SW캡스톤디자인)_수정_page-0001 (1)](https://github.com/BHC-capstone/FitMe/assets/86943988/e6e18986-1f36-4969-8574-d2ce497ac278)
