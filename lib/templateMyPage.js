module.exports = {
    myPage : function html(id, name, clubList, postList, commentList){
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/styles/myPage.css">
            <!-- 부트스트랩 -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <title>SSUB CLUBS</title>
        </head>
        <body>
            <!-- 부트스트랩 -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            
            <!-- 헤더  -->
            <header>
                <div class="clubName">
                  <!-- 동아리 이름 -->
                  <h1>마이페이지</h1>
                </div>
        
                <!-- 네비게이션 -->
                <div>
                    <nav class="navbar navbar-expand-lg navbar-light bg-info">
                        <div class="container-fluid">
                            <span class="navbar-brand">
                                <a class="btn btn-primary" href="/main" role="button">SSU Clubs</a>
                            </span>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link" href="#info">내 정보</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#myPost">내가 쓴 글</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#myComment">내 댓글</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        
            <main>
                <!-- 내 정보 -->
                <section id="info">
                    <div class="fs-3 title">내 정보</div>
                    <div id="infoBox">
                        <!-- 내 정보 박스 -->
                        <div class="fs-5">${id}</div>
                        <div class="fs-5">${name}</div>
                        <div><a class="fs-5" href="/changePW">비밀번호 변경</a></div>
                        <ul class="list-unstyled">
                            <li class="fs-5">소속 동아리</li>
                            ${clubList}
                        </ul>
                    </div>
                </section>
        
                <!-- 내가 쓴 글 -->
                <section id="myPost">
                    <div class="fs-4 title">내가 쓴 글</div>
                    <div id="myPostList">
                        <!-- 내가 쓴 글 목록 테이블-->
                        <div class="container table-responsive"></div>
                            <table class="table table-bordered table-striped caption-top">
                                <thead>
                                <tr>
                                    <th style="width: 40%">제목</th>
                                    <th style="width: 20%">동아리</th>
                                    <th style="width: 20%">작성 날짜</th>
                                    <th style="width: 10%">수정</th>
                                    <th style="width: 10%">삭제</th>
                                </tr>
                                </thead>
                                <tbody>
                                    ${postList}
                                </tbody>
                            </table>
                    </div>
                </section>
        
                <!-- 내 댓글 -->
                <section id="myComment">
                    <div class="fs-4 title">내 댓글</div>
                    <div id="myCommentList">
                        <!-- 내 댓글 목록 테이블-->
                        <div class="container table-responsive"></div>
                            <table class="table table-bordered table-striped caption-top">
                                <thead>
                                <tr>
                                    <th style="width: 40%">내용</th>
                                    <th style="width: 40%">링크</th>
                                    <th style="width: 20%">작성일</th>
                                </tr>
                                </thead>
                                <tbody>
                                ${commentList}
                                </tbody>
                            </table>
                    </div>
                </section>
        
                <div class="button" id="logout"><a class="btn btn-secondary text-white write" href="/logout" role="button">로그아웃</a></div>
                <div class="button" id="withdraw"><a class="btn btn-danger text-white write" href="/withdrwal" role="button">회원탈퇴</a></div>
            </main>
        </body>
        </html>
        `
    }

}
