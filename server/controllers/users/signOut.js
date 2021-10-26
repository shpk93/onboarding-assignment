const { isAuthorized } = require("../../utils/tokenFunctions");

module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);

  if (!userInfo) {
    return res.status(401).json({
      message: "Unauthorized request",
    });
  }
  res
    .cookie("accessToken", "", {
      httpOnly: true,
      maxAge: 1,
    })
    .status(200)
    .json({ message: "ok" });
};
