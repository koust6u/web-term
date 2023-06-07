/*
방명록 기능
설명: 해당 기능은 pre 태그 형식으로 블로그 사용자가 자신의 정보와 글을 짧게 블로그 방명록 게시판에 남길 수 있게 해주는 기능을
java script로 구현해 두었다. 이번 프로젝트에서는 서버를 별도로 두지 않았기 때문에 휘발성으로 정보가 저장된다.
또한 서버가 없는 상황에서는 paging 기능이 비교적 무거울 수 있어 배제해두었다.

단순하게 사용자가 방명록을 input text,textarea, select option들로 입력을 하면 그 정보를 바탕으로 pre 태그에 추가하여 갱신해 나가는 식으로 구현했다.
 */

function addGuestbookEntry() {
    const nameInput = document.getElementById("name");
    const regionInput = document.getElementById("region");
    const messageInput = document.getElementById("message");
    const errorMessage = document.getElementById("errorMessage");
    if(messageInput.value === "" || nameInput.value===""){
        errorMessage.innerHTML = "값을 모두 입력하시길 바랍니다."
        return;
    }
    const name = nameInput.value;
    const region = regionInput.value;
    const message = messageInput.value;
    
    const date = new Date();
    const dateString = date.getFullYear() + " 년" + (date.getMonth() + 1) + " 월" + date.getDate()+ " 일";
    
    const entry = document.createElement("pre");
    const text = document.createTextNode("    작성 일시: "+ dateString + "\n    지역: " + region + "\n    이름: " + name + "\n    내용: " + message);
    entry.appendChild(text);
    
    console.log(entry);
    const guestbookEntries = document.getElementById("guestbookEntries");
    guestbookEntries.appendChild(entry);
    const horizentalLine = document.createElement("hr");
    guestbookEntries.appendChild(horizentalLine);
    nameInput.value = "";
    messageInput.value = "";
}