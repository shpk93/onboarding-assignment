const { post, user } = require("../../models");

module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    let postDetail = await post.findOne({
      where: { id },
      include: {
        model: user,
        attributes: { exclude: ["password"] },
        as: "author",
      },
      attributes: { exclude: ["authorId"] },
    });
    res.status(200).json({ data: postDetail });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "database Err" });
  }
};
