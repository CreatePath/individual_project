const express = require('express');
const router = express.Router();
const maria = require('../database/connect/maria');

router.post('/write/:pageId/create_process', (req, res) => {
    const filteredId = req.params.pageId; // url에서 동아리 이름 추출
    const title = req.body.post_title; // 글 제목
    const desc = req.body.post_desc; // 글 내용
    const writer = req.session.user.id; // 작성자 id
    const kind = req.body.post_kind; // 업로드할 글의 종류

    console.log(writer);
    console.log(kind);

    if (kind == 0) where = "notice"; // 콤보박스에서 공지사항 선택시 0으로 전달되기 때문.
    else where = "gallery"; // 갤러리 선택시 1로 전달되기 때문.

    // DB에 글 제목, 내용, 작성자, 동아리, 글 종류를 insert.
    maria.query(`INSERT INTO post (post_title, post_desc, writer, club, class) 
    VALUES ("${title}", "${desc}", "${writer}", "${filteredId}", ${kind})`,
    (err, rows, fields) => {
        console.log("글 쓰기 쿼리 호출");
        res.redirect(303, `/${where}/${filteredId}`);
    });
});
module.exports = router;