const { post, user } = require("../../models");

module.exports = async (req, res) => {
  //페이지네이션 옵션
  let limit = req.query.limit || 30;
  let offset = req.query.offset || 0;

  try {
    let { count, rows } = await post.findAndCountAll({
      include: { model: user, attributes: ["name"], as: "author" },
      attributes: { exclude: ["content", "userId"] },
      limit,
      offset,
    });
    // 클라 요청사항에 맞게 가공하여 응답
    rows.forEach((post) => {
      post.dataValues.author = post.dataValues.author.name;
    });
    res.status(200).json({ count, data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "database Err" });
  }
};
