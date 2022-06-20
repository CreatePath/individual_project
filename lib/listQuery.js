const club = require('./templateClub');
const maria = require('../database/connect/maria');
const profile = require("../lib/templateProfile");

module.exports = {
    getQuery : function getList(where, where_ko, req, res, filteredId){
    maria.query(`SELECT post_id, post_title, writer, written_date FROM post
     where class = ${where} AND club = "${filteredId}"`, (err, rows, fields) => {
        if (err){
            res.send("에러 났어요... \n" + err);
        } else{
            var list = ``;
            for(var i = rows.length-1; 0 <= i; i--){
                var post_id = rows[i].post_id;
                list += `
                <tr>
                    <td><a href="/post/${filteredId}/${post_id}">${rows[i].post_title}</a></td>
                    <td>${rows[i].writer}</td>
                    <td>${rows[i].written_date}</td>
                </tr>
                `
            }
            var user_info = profile.profile(req.session.user.id, req.session.user.name);
            res.send(club.html(filteredId, where_ko, list, user_info));
        }
    })
}
}