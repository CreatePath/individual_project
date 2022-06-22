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
            <!-- 탈퇴 버튼 누를 때 발생하는 이벤트 처리 (js파일 적용이 안돼서..) -->
            <script>
                function outClub(clubName) {
                    console.log("동아리 탈퇴 입장")
                    if (confirm("정말 탈퇴하시겠습니까? 탈퇴 이후 해당 동아리에서 글 작성은 제한되지만 이미 작성한 글 및 댓글은 보존됩니다.")){
                        location.href="/out/"+clubName;
                    }
                }
                
                function askWithdrawl() {
                    if (confirm("정말 탈퇴하시겠습니까? 탈퇴 후 삭제된 모든 데이터는 복구할 수 없습니다.")){
                        location.href="/withdrawal";
                    }
                }
                
                function askLogout() {
                    if (confirm("로그아웃 하시겠습니까?")) {
                        location.href="/logout";
                    }
                }

                function askDelete(pageId) {
                    if (confirm("정말 삭제하시겠습니까?")) {
                        console.log(pageId);
                        location.href = "/delete/"+pageId;
                    }
                }
            </script>
            
            <!-- 헤더  -->
            <header>
                <div class="clubName">
                  <!-- 동아리 이름 -->
                  <h1>${id}</h1>
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
                        <ul class="list-unstyled">
                            <li class="fs-5">소속 동아리</li>
                            ${clubList}
                        </ul>
                        <div><a class="fs-5" href="/changePW">비밀번호 변경</a></div>
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
        
                <div class="button" id="logout"><button class="btn btn-secondary text-white write" onclick="askLogout()">로그아웃</button></div>
                <div class="button" id="withdraw"><button class="btn btn-danger text-white write" onclick="askWithdrawl()">회원 탈퇴</button></div>
            </main>
        </body>
        </html>
        `
    }

}
