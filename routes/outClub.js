const express = require("express");
const maria = require("../database/connect/maria");

const router = express.Router();

router.get("/out/:pageId", (req, res) => {
    if (!req.session.user) res.redirect("/login");
    const id = req.session.user.id;
    const clubName = req.params.pageId;
    maria.query(`SELECT user_club FROM user WHERE user_id="${id}"`, (err, rows) => {
        let clubs = rows[0].user_club.split(",");
        for (var i=0; i<clubs.length; i++) {
            if (clubs[i] === clubName) {
                clubs.splice(i,1);
                break
            }
        }
        console.log(clubs);
        var clubString = clubs.join(",");
        console.log(clubString);
        maria.query(`UPDATE user SET user_club="${clubString}" WHERE user_id="${id}"`, 
        (err, rows) => {
            res.send(`<script>alert('${clubName}을 탈퇴하셨습니다.');location.href='/mypage/${id}';</script>`)
        })
    })
})

module.exports = router;