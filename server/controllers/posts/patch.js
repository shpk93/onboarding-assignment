const { post: posts } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunctions");

module.exports = async (req, res) => {
  const id = Number(req.params.id);
  const userInfo = isAuthorized(req);

  const { post, content } = req.body;
  //수정 목록 제작.
  let payload = {};
  if (post) payload.post = post;
  if (content) payload.content = content;

  //유저가 로그인 상태가 아닐때
  if (!userInfo) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  try {
    const postInfo = await posts.findOne({ where: { id } });
    //수정 요청한 게시물이 없을 때
    if (!postInfo) {
      return res.status(404).json({ message: "not exist" });
    }
    //게시물 작성자와 요청자가 일치할 때 포스트 삭제
    if (userInfo.id === postInfo.dataValues.userId) {
      await posts.update(payload, { where: { id } });
      res.status(200).json({ message: "complete update" });
    } else {
      //작성자와 요청자가 일치하지 않을 때
      res.status(401).json({ message: "Unauthorized request" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "database Err" });
  }
};
