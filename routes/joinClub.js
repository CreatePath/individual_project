const express = require("express");
const maria = require('../database/connect/maria')

const router = express.Router();

router.get("/join/:pageId", (req, res) => {
    if (!req.session.user) res.redirect("/login");
    else {
        var clubName = req.params.pageId;
        const id = req.session.user.id;
        maria.query(`SELECT user_club FROM user WHERE user_id="${id}"`, (err, rows) => {
            if (rows[0].user_club === "") {
                maria.query(`UPDATE user SET user_club = "${clubName}" WHERE user_id="${id}"`, (err, rows) => {
                    res.send(`<script>alert('축하합니다! ${clubName}의 부원이 되셨습니다!');location.href='/notice/${clubName}'</script>`);
                });
            } else {
                let clubs = rows[0].user_club.split(",");
                for (var i=0; i<clubs.length; i++) {
                    if (clubs[i] === clubName) return res.send(`<script>alert('이미 가입하셨습니다.');location.href='/notice/${clubName}'</script>`);
                }
                clubs.push(clubName);
                let clubString = clubs.join(",");
                maria.query(`UPDATE user SET user_club = "${clubString}" WHERE user_id="${id}"`, (err, rows) => {
                    res.send(`<script>alert('축하합니다! ${clubName}의 부원이 되셨습니다!');location.href='/notice/${clubName}'</script>`);
                });
            }
        })
    }
})

module.exports = router;