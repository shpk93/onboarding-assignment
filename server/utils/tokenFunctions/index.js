const { sign, verify } = require("jsonwebtoken");

//심사 편의성을 위해서 env파일 대신 이곳에 암호키를 선언하였습니다.
const env_SECRET = process.env.ACCESS_SECRET || "test";
module.exports = {
  generateAccessToken: (data) => {
    return sign(data, env_SECRET);
  },

  isAuthorized: (req) => {
    let tokenCookie = req.cookies.accessToken;
    if (!tokenCookie) return null;
    try {
      return verify(tokenCookie, env_SECRET);
    } catch (err) {
      console.log(err, "토큰 해독실패");
      return null;
    }
  },
};
