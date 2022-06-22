module.exports = {
    html : function html(clubName, url, title, desc) {
        return `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>SSU CLUBS</title>
                <link href="/styles/write.css" rel="stylesheet">
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
                <main>
                    <form action="${url}" method="POST" enctype="multipart/form-data">
                        <!-- 게시판 선택 콤보박스 -->
                        <select name="post_kind" class="form-group">
                            <option value="0" selected>공지사항</option>
                            <option value="1">갤러리</option>
                        </select>
                        <div class="form-group">
                            <!-- 게시글 제목 -->
                            <input type="text" placeholder="제목을 입력해 주세요." name="post_title" id="title" value="${title}">
                        </div>
                        <div class="form-group">
                            <!-- 게시글 내용 -->
                            <textarea style="resize: none;" name="post_desc" id="desc" placeholder="내용을 입력해 주세요.">${desc}</textarea>
                        </div>
                        <!-- 첨부파일 -->
                        <!-- <div id="files" class="form-group">
                            <label for="fileUpload" class="fs-3">첨부 파일</label>
                            <br><br>
                            <input type="file" class="form-control-file" id="fileUpload">
                        </div> -->
                        <button type="submit" class="btn btn-primary" id="submit">업로드</button>
                    </form>               
                </main>
            </body>
            </html>
        `
    }
}