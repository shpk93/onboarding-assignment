const { user } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  let { email, password } = req.body;

  try {
    const userInfo = await user.findOne({
      where: {
        email,
        password,
      },
    });

    // 요청된 유저정보가 일치하지 않을때 응답
    if (!userInfo) {
      return res.status(404).json({ message: "invalid user" });
    }

    delete userInfo.dataValues.password;
    const accessToken = generateAccessToken(userInfo.dataValues);
    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .status(200)
      .json({ message: "success login" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "database Err" });
  }
};
