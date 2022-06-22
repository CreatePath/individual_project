const express = require("express");
const router = express.Router();

const maria = require('../database/connect/maria');
const ssuClubs = require('../lib/clubList');

// crypto 모듈을 이용해 비밀번호 암호화
const crypto = require('crypto');

router.post("/register-process", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const clubs = req.body.club;

    // 아이디 중복 검사
    const idQuery = `SELECT user_id FROM user WHERE user_id = "${id}"`;
    maria.query(idQuery, (err, rows) => {
        if (err) res.send("에러났어요.. 뒤로 돌아가주세요..\n" + err);
        else{
            if (rows.length) {
                return res.send("<script>alert('입력하신 아이디는 이미 사용중입니다.');location.href = '/register';</script>");
            }
        } 
    })

    // 비밀번호 암호화
    crypto.pbkdf2(pw, 'salt', 100000, 64, 'sha512', (err,  derivedKey) => {
        if (err) {
        throw err;
        }
        const changedPW = derivedKey.toString('hex'); // hex방식으로 암호화된 pw.

        const insertQuery = `INSERT INTO user (user_id, user_pw, user_name, user_club) 
        VALUES ("${id}", "${changedPW}", "${name}", "${clubs}")`;

        // 폼에서 입력한 회원정보를 DB에 보낸 후 로그인 화면으로 redirect.
        maria.query(insertQuery, (err, rows) => {
            if (err) res.send("에러났어요.... 뒤로 돌아가 주세요..\n" + err);
            else {
                return res.send("<script>alert('회원이 되신 걸 축하드립니다! 로그인 후 이용해주세요.');location.href='/login'</script>");
            }
        })
    });
})
module.exports = router;