// express 미들웨어 설정
const compression = require('compression');
const cors = require("cors");

const { indexRouter } = require("./src/router/indexRouter");
const { userRouter } = require("./src/router/userRouter");

const express = require('express');
const app = express();
const port = 3000;

// express 미들웨어 설정

// 정적 파일제공 (리버스 프록시를 위한 nginx 설정 재시작후) 
app.use(express.static("front"));

// cors 설정 (연습중이므로 보안설정을 느슨하게 설정함)
app.use(cors());

// body  json 파싱
app.use(express.json());

// HTTP 요청 압축
app.use(compression());

// 라우터 모듈 분리
indexRouter(app);
userRouter(app);


app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`);
});