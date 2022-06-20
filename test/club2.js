const maria = require('../database/connect/maria')

var commentList = ``;
const commentQuery = `SELECT comment_desc, post_num, written_date FROM comment WHERE writer="hary0427"`;
const postInfoQuery = `SELECT post_title, club FROM post WHERE post_id=` 
maria.query(commentQuery, (err, comment_rows) => {
    for (var i=0; i<comment_rows.length; i++){
        console.log(comment_rows);
        var comment_desc = comment_rows[comment_rows.length-i-1].comment_desc;
        var comment_date = comment_rows[comment_rows.length-i-1].written_date;
        var post_id = comment_rows[comment_rows.length-i-1].post_num;
        maria.query(`SELECT post_title, club FROM post WHERE post_id=${post_id}`, (err, post_rows) => {
            if (err) console.log(err);
            console.log(comment_desc, comment_date, post_id)
            console.log(post_rows);
            var post_title = post_rows[0].post_title;
            var post_club = post_rows[0].club;
            commentList += `
                <tr>
                    <td>${comment_desc}</td>
                    <td><a href="/post/${post_club}/${post_id}">${post_title}</a></td>
                    <td>${comment_date}</td>
                </tr>
            `
            console.log(commentList);
        })
    }
})