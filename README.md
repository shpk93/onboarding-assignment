# onboarding-assignment

## 개발 환경

- 개발 언어: JavaScript,
- 실행 환경: Node.js v14.16.1
- 서버 프레임워크: express v4.17.1
- 데이터베이스 및 ORM : sqlite, sequelize

## 구현 방법
Node.js를 통해서 구현해보았습니다.
- in-memory DB구현을 위해 sqlite3를 사용하였습니다. 또한 in-memory DB의 경우 추후 다른 DB로 이관 할 가능성이 높다 판단하여
sequelize ORM을 통해 보다 편리한 데이터 관리를 진행하였습니다.
- jsonwebtoken을 이용하여 인증기능을 구현하였습니다. 사용자는 로그인 시 인증에 필요한 access token을 cookie에 보관합니다.
- 사용자가 보낸 cookie를 객체로 편리하게 관리하기 위해 cookie-parser 라이브러리를 사용하였습니다.
- 최대한 실행 예제에 나와있는 정보를 바탕으로 개발을 진행하였습니다. (포트번호, db테이블구성, 인증수단 token사용)

## 실행 방법
- `cd server`로 폴더 이동을 합니다.
- `npm install`로 의존성 모듈을 설치합니다.
- `npm start`로 서버를 실행합니다.
- api 세부정보를 확인하고 올바른 요청을 보냅니다.

## API 정보 
root-endpoint : ```http://localhost:3000```

### 세부 정보를 확인하시려면 https://bit.ly/3pBvb8b 로 이동해주세요. ###


 ### USER
| 메소드 | path   | 설명                                                                     |
| ------ | ---------- | ------------------------------------------------------------------------ |
| POST   | `/users/signUp`  | 회원 가입 요청                                           |
| POST   | `/users/signIn`  | 로그인 요청                               |
| GET    | `/users/signOut` | 로그아웃 요청                                                            |

 ### POST

| 메소드 | path   | 설명                                                                     |
| ------ | ---------- | ------------------------------------------------------------------------ |
| GET   | `/posts`  | 전체 게시물 조회                                          |
| GET   | `/posts/:id`  | 게시물 상세 조회                              |
| POST    | `posts` | 게시물 작성                                                             |
| DELETE    | `posts/:id`    | 게시물 삭제                          |
| PATCH    | `posts/:id`    | 게시물 수정                          |

