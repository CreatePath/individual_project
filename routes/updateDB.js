const express = require('express');
const maria = require("../database/connect/maria");

const router = express.Router();

router.post("/update/:pageId/:postId/update-process", (req, res) => {
    if (!req.session.user) res.redirect("/login");
    else {
        const post_club = req.params.pageId;
        const post_id = req.params.postId;
        maria.query(`UPDATE post SET post_title="${req.body.post_title}", post_desc="${req.body.post_desc}" WHERE post_id=${post_id}`, 
        (err, rows) =>{
            res.send(`<script>alert('글이 수정되었습니다.');location.href="/post/${post_club}/${post_id}"</script>`);
        })
    }
})

module.exports = router;