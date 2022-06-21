const express = require('express');
const maria = require("../database/connect/maria");
const templateUpdate = require('../lib/templateWrite')

const router = express.Router();

router.get("/update/:postId", (req, res) => {
    if (!req.session.user) res.redirect("/login");
    else {
        const post_id = req.params.postId;
        maria.query(`SELECT post_title, club, post_desc FROM post WHERE post_id=${post_id}`, (err, rows) => {
            res.send(templateUpdate.html(rows[0].club, `/update/${rows[0].club}/${post_id}/update-process`, rows[0].post_title, rows[0].post_desc));
        })
    }
})

module.exports = router;