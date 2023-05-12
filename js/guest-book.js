function addGuestbookEntry() {
    const nameInput = document.getElementById("name");
    const regionInput = document.getElementById("region");
    const messageInput = document.getElementById("message");
    
    if(messageInput.value === "" || nameInput.value==="")return;
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