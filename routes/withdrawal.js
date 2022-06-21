const express = require("express");
const maria = require("../database/connect/maria");

const router = express.Router();

router.get("/withdrawal", (req, res) => {
    if (!req.session.user) res.redirect("/login");
    else {
        const id = req.session.user.id;
        maria.query(`DELETE FROM comment WHERE writer = "${id}"`, (err, rows) => {
            if (err) throw err;
            maria.query(`DELETE FROM post WHERE writer="${id}"`, (err, rows) => {
                if (err) throw err;
                maria.query(`DELETE FROM user WHERE user_id="${id}"`, (err, rows) => {
                    if (err) throw err;
                    req.session.destroy((err) => {
                        if (err) throw err;
                        res.send(`<script>alert("SSU Clubs에서 탈퇴하셨습니다. 사용해주셔서 감사합니다.");location.href="/login"</script>`);
                    })
                })
            })
        })
    }
})

module.exports = router;