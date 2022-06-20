function checkId() {
    var id = document.getElementById("id").value;
    if (id.length < 5 || 20 < id.length) {
        document.getElementById("id").style.color = "red"; 
        document.getElementById("id").style.border = "1px solid red";
        document.getElementById("submit").disabled = true;           
        alert("5~20자의 아이디를 입력해주세요.");
    } else {
        document.getElementById("id").style.color = "green"; 
        document.getElementById("id").style.border = "1px solid green";
        document.getElementById("submit").disabled = false;           
    }
}

function checkPW(){
    var pw = document.getElementById("pw").value;
    var pw_2 = document.getElementById("pw_2").value;
    if (pw !== undefined && pw_2 !== undefined && pw === pw_2){
        if (pw.length < 5 || 20 < pw.length) {
            document.getElementById("pw").style.color = "red"; 
            document.getElementById("pw").style.border = "1px solid red";
            document.getElementById("submit").disabled = true;           
            alert("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
        } else {
            document.getElementById("pw").style.color = "green"; 
            document.getElementById("pw").style.border = "1px solid green"; 
            document.getElementById("pw_2").style.color = "green"; 
            document.getElementById("pw_2").style.border = "1px solid green";
            document.getElementById("submit").disabled = false;           
        }
    } else {
        document.getElementById("pw").style.color = "red"; 
        document.getElementById("pw").style.border = "1px solid red";
        document.getElementById("pw_2").style.color = "red"; 
        document.getElementById("pw_2").style.border = "1px solid red";
        document.getElementById("submit").disabled = true;           
        alert("비밀번호가 일치하지 않습니다!");
        
    }
}

function addList() {
    var list = document.createElement("li");
    var inputClub = document.createElement("input");
    inputClub.setAttribute("type", "text");
    inputClub.setAttribute("placeholder", "동아리 이름을 정확히 입력해주세요.");
    inputClub.setAttribute("name", "club");
    document.getElementById("clubList").appendChild(list).appendChild(inputClub);
}