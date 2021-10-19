const { user } = require("../../models");
const { generateAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  let { name, email, password } = req.body;

  //파라미터가 충족되지 않았을때 응답
  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ message: "insufficient parameters supplied" });
  }

  try {
    const [userInfo, created] = await user.findOrCreate({
      where: {
        email,
        password,
      },
      defaults: {
        name,
      },
    });
    if (!created) {
      return res
        .status(409)
        .json({ message: "this email has already been registered" });
    }
    delete userInfo.dataValues.password;
    const accessToken = generateAccessToken(userInfo.dataValues);
    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .status(201)
      .json({ message: "complete sign up" });

    //db 오류시 응답
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "database Err" });
  }
};
