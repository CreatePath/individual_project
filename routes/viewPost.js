const express = require('express');
const router = express.Router();

const template = require('../lib/templateView');
const tempCommentList = require("../lib/commentList");
const profile = require('../lib/templateProfile');
const maria = require('../database/connect/maria');

router.get("/post/:pageId/:postId", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        const filteredId = req.params.pageId;
        const post_id = req.params.postId;
        maria.query(`SELECT post_title, writer, post_desc, written_date, class FROM post WHERE post_id = ${post_id}`, 
        (err, rows, fields) => {
            if (err){
                res.send(`에러났어요...\n${err}`);
            } else{
                const title = rows[0].post_title;
                const desc = rows[0].post_desc;
                const writer = rows[0].writer;
                var date = rows[0].written_date; // UTC 시간
                date.setHours(date.getHours() + 9); // 한국 시간으로 변환
                dateString = date.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"}); // 출력 형식 지정
                if (rows[0].class === 0) where = "notice";
                else where = "gallery";
                const user_info = profile.profile(req.session.user.id, req.session.user.name);
                maria.query(`SELECT comment_desc, writer, written_date FROM comment WHERE post_num = ${post_id}`, 
                (err, comment_rows) => {
                    if (err) throw err;
                    var list = "";
                    if (comment_rows[0]) {
                        for (var i=0; i<comment_rows.length; i++) {
                            var commentObj = comment_rows[comment_rows.length-i-1];
                            var comment = commentObj.comment_desc;
                            var comment_writer = commentObj.writer;
                            var comment_time = commentObj.written_date; // UTC 시간
                            comment_time.setHours(comment_time.getHours() + 9); // 한국 시간
                            var commentTimeString = comment_time.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"}); // 형식 지정.
                            list += tempCommentList.commnetList(comment_writer, commentTimeString, comment);
                        }
                    }
                    const html = template.viewHtml(filteredId, title, writer, dateString, desc, where, list, user_info); 
                    res.send(html);
                })
            }
        })
    }
})
module.exports = router;