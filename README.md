# 동아리 게시판 프로젝트
모든 동아리의 게시판 구현.   
## 웹사이트 접속   
회원가입 또는 아래 테스트 아이디로 로그인.   
id: testid   
pw: 12345678   
~~https://ssu-clubs.herokuapp.com/login~~   
heroku에서 free Dynos 서비스를 종료해서 더 이상 사용할 수 없음..
## 기능 요약
게시글 CRUD, 회원 CRUD, 댓글CR__
## 개발 요약
### 프론트엔드
HTML/CSS/JS, bootstrap   
bootstrap을 이용하여 반응형 navbar 구현.   
bootstrap의 grid system을 많이 사용하지 않음.   
대신 CSS에서 flexbox를 사용하여 반응형 웹 구현. 그러나 아직 미흡한 부분이 많음.
### 백엔드
node.js 서버. express 사용.   
DB는 mysql 사용.   
DB구조   
![DB구조](https://user-images.githubusercontent.com/101233934/178154212-c98bd186-e628-4385-8608-369e9af0a755.png)

