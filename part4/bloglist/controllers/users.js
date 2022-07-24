const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken')

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username === undefined || password === undefined) {
    return response.status(400).json({
      error: "both username and password need to be added"
    })
  }
  
  const passwordlength = password.length;
  const usernamelength = username.length;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }
  if (passwordlength < 3) {
    return response.status(400).json({
      error: "password should have more than 3 characters",
    });
  }
  if (usernamelength < 3) {
    return response.status(400).json({
      error: "username should have more than 3 characters",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  const userForToken = {
    username: user.username,
    id: user._id
}

const token = jwt.sign(userForToken, process.env.SECRET)

response.status(200).send({ token, username: user.username, name: user.name })

});

usersRouter.get("/", async (request, response) => {
  let users = await User.find({}).populate("blogs", { content: 1, date: 1 });
  response.json(users);
});

module.exports = usersRouter;
