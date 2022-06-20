module.exports = { 
    profile : function profile(id, name) {
        return `
                <div class="d-flex">
                    <ul class="list-unstyled">
                        <li><p class="fs-5">${id}<br>${name}</p></li>
                        <li><a href="/mypage/${id}">마이페이지</a></li>
                        <li><button type="button" class="btn btn-secondary" onclick="window.location.href='/logout'">로그아웃</button></li>
                    </ul>
                </div>
        `
    }
}