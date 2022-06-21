const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require("express-session");
const cookieParser = require("cookie-parser");

// template
const profile = require('./lib/templateProfile');
const clubList = require("./lib/clubList");
const main = require('./lib/templateMain.js');
const postList = require('./lib/listQuery');
const accessWrite = require("./routes/accessWrite");

// router
const login_process = require("./routes/login");
const joinClub = require("./routes/joinClub");
const writePost = require('./routes/postData');
const viewPost = require('./routes/viewPost');
const register = require('./routes/registerSubmit');
const myPage = require("./routes/myPage.js");
const updatePost = require("./routes/updatePost");
const updateDB = require("./routes/updateDB");
const deletePost = require("./routes/deletePost");
const outClub = require('./routes/outClub');
const createComment = require("./routes/createComment");
const withdrwal = require("./routes/withdrawal");

const app = express();
const form_data = multer();
const port =   process.env.PORT || 3000;

// 세션 세팅
app.use(
    session({
        secret: "my key",
        resave: false,
        saveUninitialized: true
    })
);

app.use(express.static(__dirname + "/lib"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(form_data.array());
app.use(cookieParser());

app.get("/", (req, res) => {
    if (!req.session.user) {
        // 세션에 유저가 없다면
        res.redirect("/login"); // 로그인 화면으로 이동
      } else {
        // 세션에 유저가 존재한다면
        res.redirect("/main"); // 메인화면으로 이동
    }
});

// 로그인 화면 
app.get("/login", (req, res) => {
    if (req.session.user) {
        res.redirect("/main");
    } else res.sendFile(__dirname + "/lib/login.html");
})

// 로그인 프로세스
app.post("/login-process", login_process);

// 회원가입 화면 
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/lib/register.html");
})

// 회원가입에서 post 요청이 오면 실행.
app.post('/register-process', register);

// 메인화면. 조회할 동아리 선택. 
app.get("/main", (req, res) => {
    if (!req.session.user){
        res.redirect("/login");
    } else {
        var categories = main.categoryList(clubList.clubList); // 동아리 분과 목록이 작성된 템플릿 가져오기.
        var club_list = main.sectionList(clubList.clubList); // 동아리 목록 작성된 템플릿 가져오기.
        var user_info = profile.profile(req.session.user.id, req.session.user.name);
        var html = main.html(categories, club_list, user_info); // html 문서 완성
        res.send(html);
    }
})

// 동아리 공지사항 페이지. pageId는 동아리 이름.
app.get("/notice/:pageId", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        var filteredId = req.params.pageId;
        postList.getQuery("0", "공지사항", req, res, filteredId);
    }
});

// 동아리 갤러리 페이지. pageId는 동아리 이름.
app.get("/gallery/:pageId", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        var filteredId = req.params.pageId;
        postList.getQuery("1", "갤러리", req, res, filteredId);
    }
});

// 마이페이지. userId는 사용자의 아이디
app.get("/myPage/:userId", myPage);

// 동아리 탈퇴 프로세스. 동아리 탈퇴 버튼 누르면 실행
app.get("/out/:pageId", outClub);

// 동아리 입부 프로세스. 동아리 입부 신청 버튼 누르면 실행
app.get("/join/:pageId", joinClub);

// 내가 쓴 글 수정 페이지. 마이페이지의 수정 버튼 누르면 실행.
app.get("/update/:postId", updatePost);

// 수정 프로세스. 수정 페이지에서 업로드 버튼 누르면 실행.
app.post("/update/:pageId/:postId/update-process", updateDB);

// 삭제 프로세스. 마이페이지의 삭제 버튼 누르면 실행.
app.get("/delete/:postId", deletePost);

// 동아리 글 쓰기 페이지. pageId는 동아리 이름.
app.get("/write/:pageId", accessWrite); 

// 동아리 글 쓰기 페이지에서 post요청이 오면 글 정보를 DB에 저장. (제목,내용,작성자,작성날짜,파일경로) 
app.post("/write/:pageId/create-process", writePost);

// 동아리 글 조회 페이지. pageId는 동아리 이름, post_num은 DB에서 사용하는 primary key인 post_id.
app.get("/post/:pageId/:postId", viewPost);

app.post("/post/:pageId/:postId", createComment);

// 로그아웃 요청 시
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.send("<script>alert('로그아웃 되었습니다.');location.href='/login'</script>");
    })
});

// 회원 탈퇴 프로세스.
app.get("/withdrawal", withdrwal);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});