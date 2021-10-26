const { post: posts } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunctions");

module.exports = async (req, res) => {
  const userInfo = isAuthorized(req);

  const { post, content } = req.body;

  //토큰 확인 후 로그인 상태가 아니면 포스트 게시 불가
  if (!userInfo) {
    return res.status(401).json({
      message: "Unauthorized request",
    });
  }
  if (!post) {
    return res
      .status(422)
      .json({ message: "insufficient parameters supplied" });
  }
  try {
    let payload = { userId: userInfo.id, post };
    if (content) payload.content = content;
    const newPost = await posts.create(payload, {
      returning: true,
    });
    res.status(201).json({ data: newPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "database Err" });
  }
};
