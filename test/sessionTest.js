const express = require("express");
const session = require('express-session');

const app = express();

// session 미들웨어를 사용한다. req.session 객체를 사용할 수 있게 해준다. 
app.use(session({
  secret: 'blah blah',
  resave: false,
  saveUninitialized: true
}));

app.get("/", (req, res) => {
  console.log(req.session) // session 생긴다!
  res.send("hello world");
});

app.listen(5000, () => {
  console.log("listening on 5000 port");
});