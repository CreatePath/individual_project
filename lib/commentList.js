module.exports = {
    commnetList : function html(id, time, desc) {
        return `
        <div class="commentListBox">
            <div class="commentInfo">
                <span class="fs-5">${id}</span>
                <span class="fs-6">&nbsp;&nbsp${time}</span>
            </div>
            <div class="commentDesc">
                ${desc}
            </div>
        </div>
        `
    }
}