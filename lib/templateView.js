module.exports = {
    viewHtml : function viewHtml(clubName, title, writer, written_date, post_desc, where, commentList, profile) {
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SSU CLUBS</title>
            <link href="/styles/viewPost.css" rel="stylesheet">
            <!-- 부트스트랩 -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <!-- 부트스트랩 -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            
            <!-- 헤더  -->
            <header>
                <div class="clubName">
                <!-- 동아리 이름 -->
                <h1>${clubName}</h1>
                </div>

                <!-- 네비게이션 -->
                <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-info">
                    <div class="container-fluid">
                    <span class="navbar-brand">
                        <a class="btn btn-primary" href="/" role="button">SSU Clubs</a>
                    </span>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/notice/${clubName}">공지사항</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/gallery/${clubName}">갤러리</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn btn-primary text-white write" href="/write/${clubName}" role="button">글쓰기</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>
                </div>
            </header>

            <!-- 메인 -->
            <main>
                <!-- 게시글 박스 -->
                <div id="postBox">
                    <!-- 글 제목 -->
                    <div id="title">
                        <label class="fs-2">${title}</label>
                    </div>
                    <!-- 작성자, 작성일 정보 -->
                    <div id="info">
                        <label class="fs-6">작성자: ${writer} 작성일: ${written_date}</label>
                    </div>
                    <!-- 글 내용 -->
                    <div id="desc" >
                        ${post_desc}
                    </div>
                    <!-- 댓글창 -->
                    <div id="commentBox">
                        <div id="createComment">
                            <textarea style="resize: none;" name="comment_content" id="write_comment" placeholder="댓글을 입력해 주세요."></textarea>
                            <button type="submit" class="btn btn-primary" id="submit">등록</button>
                            <a class="btn btn-secondary" href="/${where}/${clubName}" role="button" id="gotoList">글 목록</a>
                        </div>
                        <br>
                        <div id="commentList">
                            ${commentList}
                        </div>
                    </div>
                </div>
                <!-- 프로필 정보 -->
                ${profile}
            </main>
        </body>
        </html>
        `
    }
}
