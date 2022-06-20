const express = require('express');
const maria = require('../database/connect/maria');
const templateMyPage = require('../lib/templateMyPage');

const router = express.Router();

router.get("/myPage/:userId", (req, res) => {
    if (!req.session.user) res.redirect("/login");
    else {
        // DB에서 회원이 가입한 동아리 가져오기
        const id = req.session.user.id;
        const name = req.session.user.name;
        var clubList = "";
        var postList = "";
        var clubQuery = `SELECT user_club FROM user WHERE user_id = "${id}"`
        maria.query(clubQuery, (err, rows) => {
            if (rows.user_club !== "") {
                console.log("1차 진입" + rows.user_club);
                clubs = rows[0].user_club.split(",");
                for (var i=0; i<clubs.length; i++){
                    clubList += `<li><a href="/notice/${clubs[i]}">${clubs[i]}</a><a class="btn btn-danger" href="/out/${clubs[i]}" role="button">탈퇴</a></li>`
                }
            } else clubList = "<li>없습니다.</li>";
            console.log(clubList)
            var postQuery = `SELECT post_id, post_title, written_date, club FROM post WHERE writer="${id}"`;
            maria.query(postQuery, (err, rows) => {
                if (rows[0].post_title !== "") {
                    for (var i=0; i<rows.length; i++){
                        const post_title = rows[rows.length-i-1].post_title;
                        const post_club = rows[rows.length-i-1].club;
                        const post_date = rows[rows.length-i-1].written_date;
                        const post_id = rows[rows.length-i-1].post_id;
                        postList += `
                            <tr>
                                <td><a href="/post/${post_club}/${post_id}">${post_title}</a></td>
                                <td>${post_club}</td>
                                <td>${post_date}</td>
                                <td><a class="btn btn-primary" href="/update/${post_id}" role="button">수정</a></td>
                                <td><a class="btn btn-secondary" href="/delete/${post_id}" role="button">삭제</a></td>
                            </tr>
                        `
                    }
                }
                console.log("2차 진입 성공")
                console.log(postList);
                var commentList = ``;
                const commentQuery = `SELECT comment_desc, post_num, written_date FROM comment WHERE writer="hary0427"`;
                const postInfoQuery = `SELECT post_title, club FROM post WHERE post_id=` 
                maria.query(commentQuery, (err, comment_rows) => {
                    for (var i=0; i<comment_rows.length; i++){
                        console.log(comment_rows);
                        var comment_desc = comment_rows[comment_rows.length-i-1].comment_desc;
                        var comment_date = comment_rows[comment_rows.length-i-1].written_date;
                        var post_id = comment_rows[comment_rows.length-i-1].post_num;
                        maria.query(`SELECT post_title, club FROM post WHERE post_id=${post_id}`, (err, post_rows) => {
                            if (err) console.log(err);
                            console.log(comment_desc, comment_date, post_id)
                            console.log(post_rows);
                            var post_title = post_rows[0].post_title;
                            var post_club = post_rows[0].club;
                            commentList += `
                                <tr>
                                    <td>${comment_desc}</td>
                                    <td><a href="/post/${post_club}/${post_id}">${post_title}</a></td>
                                    <td>${comment_date}</td>
                                </tr>
                            `
                            res.send(templateMyPage.myPage(id, name, clubList, postList, commentList));
                        })
                    }
                })
            })
        });
    }
})

module.exports = router;