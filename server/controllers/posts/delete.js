const { post } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
module.exports = async (req, res) => {
  const id = req.params.id;
  const userInfo = isAuthorized(req);

  //유저가 로그인 상태가 아닐때
  if (!userInfo) {
    return res.status(401).json({ message: "login plz" });
  }
  try {
    let postInfo = await post.findOne({ where: { id } });
    //게시물 작성자와 요청자가 일치할 때 포스트 삭제
    if (userInfo.id === postInfo.userId) {
      await post.destroy({ where: { id } });
      res.status(200).json({ message: "complete delete" });
    } else {
      //작성자와 요청자가 일치하지 않을 때
      res.status(401).json({ message: "Unauthorized request" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "database Err" });
  }
};
