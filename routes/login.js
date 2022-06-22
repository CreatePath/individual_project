const express = require("express");
const crypto = require('crypto');
const maria = require("../database/connect/maria");

const router = express.Router();

router.post("/login-process", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    crypto.pbkdf2(pw, 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) throw err;

        // 입력받은 pw 암호화
        const changedPW = derivedKey.toString('hex');

        // 입력받은 id 및 암호화된 pw와 일치하는 id, pw 가 DB에 있는지 물어봄.
        const query = `SELECT user_id, user_pw, user_name FROM user 
        WHERE user_id = "${id}" AND user_pw = "${changedPW}"`

        maria.query(query, (err, rows) => {
            if (err) throw err;

            // 일치하는 id, pw가 있으면 로그인 성공 알리고 메인페이지로 redirect. 
            // 일치하는 id, pw가 없으면 로그인 실패 알리고 로그인페이지로 redirect.
            if (rows.length){
                // 세션 생성
                req.session.user = {
                    id: id,
                    pw: changedPW,
                    name: rows[0].user_name,
                    authorized: true
                };
                req.session.save(() => {
                    res.redirect("/");
                })
            } else {
                res.send("<script>alert('로그인에 실패하였습니다. 다시 입력해주세요.');location.href='/login';</script>");
            }
        })
    });
})

module.exports = router;