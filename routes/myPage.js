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
        var clubQuery = `SELECT user_club FROM user WHERE user_id = "${id}"`
        maria.query(clubQuery, (err, rows) => {
            console.log(rows);
            console.log(rows[0].user_club);
            if (rows[0].user_club !== "") {
                clubs = rows[0].user_club.split(",");
                console.log(clubs);
                for (var i=0; i<clubs.length; i++){
                    clubList += `<li class="clubLine"><a href="/notice/${clubs[i]}">${clubs[i]}</a><button class="btn btn-danger text-white write" onclick="outClub('${clubs[i]}')">탈퇴</button></li>`
                }
            } else clubList = "<li>없습니다.</li>";
            var postList = "";
            var postQuery = `SELECT post_id, post_title, written_date, club FROM post WHERE writer="${id}"`;
            maria.query(postQuery, (err, rows) => {
                if (rows[0]) {
                    for (var i=0; i<rows.length; i++){
                        const post_title = rows[rows.length-i-1].post_title;
                        const post_club = rows[rows.length-i-1].club;
                        var post_time = rows[rows.length-i-1].written_date;
                        post_time.setHours(post_time.getHours() + 9);
                        var post_timeString = post_time.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
                        const post_id = rows[rows.length-i-1].post_id;
                        postList += `
                            <tr>
                                <td><a href="/post/${post_club}/${post_id}">${post_title}</a></td>
                                <td>${post_club}</td>
                                <td>${post_timeString}</td>
                                <td><a class="btn btn-primary" href="/update/${post_id}" role="button">수정</a></td>
                                <td><a class="btn btn-secondary" href="/delete/${post_id}" role="button">삭제</a></td>
                            </tr>
                        `
                    }
                }
                // 댓글 목록 ==> 댓글 내용, 댓글 작성시간, 본문 링크(동아리, postId, 본문 제목 필요)
                // 밤새도록 사투를 벌였으나 구현 실패..........
                var list = ``;
                var commentInfoList = [];
                const commentQuery = `SELECT comment_desc, post_num, written_date FROM comment WHERE writer="${id}"`;
                maria.query(commentQuery, (err, comment_rows) => {
                    if (err) console.log(err);
                    if (comment_rows[0]){
                        for (var i=0; i<comment_rows.length; i++){
                            var commentObj = comment_rows[comment_rows.length-i-1];
                            var comment_time = commentObj.written_date
                            comment_time.setHours(comment_time.getHours() + 9);
                            var commentTimeString = comment_time.toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
                            commentInfo = [commentObj.comment_desc, commentObj.post_num, commentTimeString];
                            commentInfoList.push(commentInfo);
                            console.log(commentInfoList);
                        } for (var j=0; j<commentInfoList.length; j++) {
                            var k = commentInfoList.length-j-1;
                            maria.query(`SELECT post_title, club FROM post WHERE post_id=${commentInfoList[k][1]}`,
                            (err, row) => {
                                if (err) throw err;
                                if (row) {
                                    var title = row[0].post_title;
                                    var club = row[0].club;
                                    list += `
                                    <tr>
                                        <td>${commentInfoList[k][0]}</td>
                                        <td><a href="/post/${club}/${commentInfoList[k][1]}">${title}</a></td>
                                        <td>${commentInfoList[k][2]}</td>
                                    </tr>
                                `
                                console.log(list);
                                }
                            })
                        }
                    } res.send(templateMyPage.myPage(id, name, clubList, postList, list));
                })
            })
        });
    }
})

module.exports = router;