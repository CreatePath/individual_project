const express = require('express');
const maria = require('../database/connect/maria');
const writePage = require("../lib/templateWrite");

const router = express.Router();

router.get("/write/:pageId",(req, res) => {
    if (!req.session.user){
        res.redirect("/login");
    } else {
        maria.query(`SELECT user_club FROM user WHERE user_id="${req.session.user.id}"`, (err, rows) => {
            const clubName = req.params.pageId;
            var clubs = rows[0].user_club.split(',');
            for (var i=0; i<clubs.length; i++){
                if (clubs[i] === clubName) return res.send(writePage.html(clubName, `/write/${clubName}/create-process`, "", ""));
            }
            res.send(`<script>alert("동아리 부원만 글 작성이 가능합니다.");location.href="/notice/${clubName}"</script>`);
        })
    }
});

module.exports = router;