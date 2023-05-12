const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/chat/completions";
const generateButton = document.getElementById("generate-btn");
window.addEventListener("DOMContentLoaded", function() {
  const generateButton = document.getElementById("generate-btn");
  generateButton.addEventListener("click", generateText);
});


async function generateText() {
  const prompt = document.getElementById("prompt").value;
  document.getElementById("prompt").value = '';
  const parameters = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": prompt+"라는 말에 어린아이의 동심을 지켜 주기위해 외계인인척 반말로 대답해야해 " , "name":"PNU"}],

    "temperature": 0.7
  };
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + API_KEY
  };
  const responseDiv = document.getElementById("response");
  let response = await fetch(API_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(parameters)});
  
  let message;
  let text = responseDiv.innerHTML;
  text = text + "me: " + prompt + "<hr>"; 
  try{
    let data = await response.json(); 
    message = data.choices[0].message.content;
    console.log(message);
  }catch(error){
      message = "자리를 비웠어요. 잠시후 다시 대화를 시도해주세요!!!";
  }
  text = text + "Little green man: " + message + "<hr>";
  responseDiv.innerHTML = text;
}