const express = require("express");
const maria = require('../database/connect/maria');

const router = express.Router();

router.post("/post/:pageId/:postId", (req, res) => {
    if (!req.session.user) res.redirect("/login");
    else {
        const desc = req.body.comment_desc;
        const writer = req.session.user.id;
        const post_id = req.params.postId;
        const club = req.params.pageId;
        const query = `INSERT INTO comment (comment_desc, writer, post_num) VALUES("${desc}", "${writer}", "${post_id}")`
        maria.query(query, (err, rows) => {
            if (err) throw err;
            res.send(`<script>alert('댓글이 등록되었습니다.');location.href="/post/${club}/${post_id}";</script>`)
        })
    }
})

module.exports = router;