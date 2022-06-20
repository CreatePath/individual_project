const maria = require('../database/connect/maria');

var clubList = ``;
var clubQuery = `SELECT user_club FROM user WHERE user_id = "hary0427"`
maria.query(clubQuery, (err, rows) => {
    console.log("진입")
    console.log(rows[0].user_club === "");
    if (rows[0].user_club) {
        console.log(rows.length)
        club = rows[0].user_club.split(",");
        for (var i=0; i<club.length; i++){
            clubList += `<li><a href="/notice/${club[i]}">${club[i]}</a><a class="btn btn-danger" href="/out/${club[i]}" role="button">탈퇴</a></li>`
        }
        // console.log(clubList);
    } else clubList = ``;
    console.log("클럽리스트:" + clubList);
})
maria.end()