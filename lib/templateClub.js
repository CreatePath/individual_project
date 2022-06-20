module.exports = {
    html : function html(clubName, where, list, profile) {
        return `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>SSU CLUBS</title>
                <link href="/styles/club.css" rel="stylesheet">
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
                            <a class="btn btn-primary" href="/main" role="button">SSU Clubs</a>
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
                            <li class="nav-item">
                                <a class="nav-link btn btn-danger text-white write" href="/join/${clubName}" role="button">입부신청</a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </nav>
                    </div>
                </header>
            
                <!-- 메인 -->
                <main>
                    <div id="mainBox">
                        <!-- 공지사항 리스트 -->
                        <div class="container table-responsive notice-list">
                            <table class="table table-bordered table-striped caption-top">
                                <caption><h2>${where}</h2></caption>
                                <thead>
                                <tr>
                                    <th style="width: 50%">제목</th>
                                    <th style="width: 20%">작성자</th>
                                    <th style="width: 30%">작성 날짜</th>
                                </tr>
                                </thead>
                                <tbody>
                                ${list}
                                </tbody>
                            </table>
                        </div>
                
                        <!-- 이전/다음 버튼 -->
                        <div class="container buttons">
                            <button type="button" class="btn btn-primary prevBtn">
                                < 이전
                            </button>
                            <button type="button" class="btn btn-primary nextBtn">
                                다음 >
                            </button>
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