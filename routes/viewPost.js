const express = require('express');
const router = express.Router();

const template = require('../lib/templateView');
const profile = require('../lib/templateProfile');
const maria = require('../database/connect/maria');

router.get("/post/:pageId/:post_num", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        const filteredId = req.params.pageId;
        const post_id = req.params.post_num;
        maria.query(`SELECT post_title, writer, post_desc, written_date, class FROM post WHERE post_id = ${post_id}`, 
        (err, rows, fields) => {
            if (err){
                res.send(`에러났어요...\n${err}`);
            } else{
                const title = rows[0].post_title;
                const desc = rows[0].post_desc;
                const writer = rows[0].writer;
                const date = rows[0].written_date;
                if (rows[0].class === 0) where = "notice";
                else where = "gallery";
                const user_info = profile.profile(req.session.user.id, req.session.user.name);
                const html = template.viewHtml(filteredId, title, writer, date, desc, where, "댓글 목록", user_info); 
                res.send(html);
            }
        })
    }
})
module.exports = router;