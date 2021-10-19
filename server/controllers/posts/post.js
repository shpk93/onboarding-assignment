const { post } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const userInfo = isAuthorized(req);

  //토큰 확인 후 로그인 상태일 시
  if (!userInfo) {
    // 로그인 상태가 아니면 포스트 게시 불가
    return res.status(401).json({
      message: "Unauthorized request",
    });
  }
  const newPost = await post.create(
    {
      userId: userInfo.id,
      post: req.body.post,
      content: req.body.content,
    },
    {
      returning: true,
    }
  );
  res.status(201).json({ data: newPost });
};
