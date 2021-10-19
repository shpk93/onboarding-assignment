const express = require("express");
const cors = require("cors");
const controllers = require("./controllers");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");

const app = express();
const port = 3000;

sequelize.sync({ alter: true });
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

//user router
app.post("/users/signUp", controllers.users.signUp);
app.post("/users/signIn", controllers.users.signIn);
app.get("/users/signOut", controllers.users.signOut);

//post router
app.get("/posts", controllers.posts.getList);
app.get("/posts/:id", controllers.posts.getDetail);
app.post("/posts", controllers.posts.post);
app.delete("/posts/:id", controllers.posts.deleted);
app.patch("/posts/:id", controllers.posts.patch);

//root router
app.get("/", (req, res) => {
  res.status(200).send("봐주셔서 고맙습니다. 잘 부탁드립니다.");
});

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
