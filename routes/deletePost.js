const express = require("express");
const maria = require("../database/connect/maria");

const router = express.Router();

router.get("/delete/:postId", (req, res) => {
    if (!req.session.user) res.redirect("/login");
    else {
        const post_id = req.params.postId;
        const id = req.session.user.id;
        maria.query(`DELETE FROM comment WHERE post_num = ${post_id}`, (err, rows) => {
            if (err) console.log(err);
            maria.query(`DELETE FROM post WHERE post_id = ${post_id}`, (err, rows) => {
                if (err) console.log(err);
                res.send(`<script>alert("글이 삭제되었습니다.");location.href="/myPage/${id}"</script>`)
            })
        })
    }
})

module.exports = router;
