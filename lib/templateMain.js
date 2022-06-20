module.exports = {
    categoryList : function headerList(clubList){
        var list = "";
        var i = 0;
        for (var category in clubList){
            list += `<a class="nav-link" href="#${category}">${category}</a>`;
        }
        return list;
    },

    sectionList : function sectionList(clubList){
        var list = "";
        for (category in clubList) {
            list += `
            <section id="${category}">
                <div class="categorieName"><h3>${category}</h3></div>
                <div class="clubList">
                    <ul class="list-unstyled">
            `
            for (var i=0; i<clubList[category].length; i++){
                list += `
                        <li class="list-inline-item">
                            <a href="/notice/${clubList[category][i]}">${clubList[category][i]}</a>
                        </li>
                `
            }
            list += `
                    </ul>
                </div>
            </section>
            `
        };
        return list;
    },

    html : function templateHTML(categories, sections, profile){
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SSU CLUBS</title>
        
            <!--Bootstrap-->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <!-- index.css -->
            <link href="styles/index.css" rel="stylesheet">
        </head>
        <body>
            <!--Bootstrap-->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            
            <header>
                <div id="head"><h1>SSU Clubs</h1></div>
                <nav class="navbar navbar-expand-lg navbar-light bg-info">
                    <div class="container-fluid">
                    <span class="navbar-brand" href="#">
                        동아리 찾기
                    </span>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div class="navbar-nav">
                            ${categories}
                        </div>
                    </div>
                    </div>
                </nav>
            </header>
        
            ${profile}
        
            <main>
                ${sections}
            </main>
        </body>
        </html>`
    }
}
