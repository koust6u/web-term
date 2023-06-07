const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/chat/completions";
const generateButton = document.getElementById("generate-btn");
var loadingMessage;
var loadingImg;

/*
js 파일과 html, css 파일을 각각 분리하여 생기는 오류를 예방하기 위해
js 파일을 가장 늦게 랜더링하여 인스턴스를 찾을 수 있게 해준다.
*/
window.addEventListener("DOMContentLoaded", function() {
  loadingImg = document.getElementById("loadingImg");
  const generateButton = document.getElementById("generate-btn");
  generateButton.addEventListener("click", generateText);
  loadingMessage = document.getElementById("loadingMessage");
  
});

/*
  1.open-web-api사용: open-AI의 open-api를 직접 받아야 챗봇 기능으르서 text를 생성해주는 로직이다.
  단 이 기능은 과금이 청구 될 우려가 있음으로 무 부분별한 text 생성을 매크로 형식으로 생성하는 것을 방지하기 위해
  로딩 시간 중에는 api의 호출 잠시 중지 시키기 위해 post형식으로 api를 호출하는 버튼을 disabled 시킨다.
  또한 로딩중이라는 것을 사용자에게 인지 시키기위해 로직 시작과 끝까지 귀연운 캐릭터를 등장시켜 로딩중이라는 것을 
  인지 시켜준다.

  2.잘못된 동작에 대한 에러 핸들링 -> 해당 api는 최대 토큰을 정할 수 있고 또한 결제 정보가 갱신 되지 않으면 api를 사용할 수 없다.
  또한 네트워크 상태에 따라서도 api를 받아 오지 못 할 수 있다. 그러므로 try catch를 통해 받아오지 못하는 경우 catch를 통해 
  지금은 서비스 사용이 불가능하다는 것을 사용자에게 알려준다.

  3. 입력 format 에러 처리 -> 해당 api는 숫자, 특수문자, 영어, 한국어 등 언어에 가리지 않고 무조건 정보를 반환하는 api임으로 null값 또는 blank에 대한
  입력 조건만 막아주면 된다. 따라서 값이 비어있다면 api를 호출 하는 것이 아닌 p 태그에 경고 메세지를 빨간색으로 노출 시킴으로서 사용자에게 인지 시켜줄 수 있다.

  4. Json기능 활용 -> api의 정보를 body에 json 형태로 받아와 필요한 부분만 추출하여 화면에 뿌려주는 방식으로 api를 활용하였다.
*/
async function generateText() {
  var btn = document.getElementById("generate-btn");
  btn.disabled = true;
  const prompt = document.getElementById("prompt").value;
  const promptStyle=  document.getElementById("prompt");
  const errorMessage = document.getElementById("errorMessage");
  if(prompt === ''){
    errorMessage.innerHTML = "값을 입력하시길 바랍니다."
    promptStyle.style.borderColor= "red";
    btn.disabled = false;
    alert("값을 입력하고 전송 부탁드립니다.🙏");
    return;
  }
  else{
    errorMessage.innerHTML = '';
    promptStyle.style.borderColor= "initial";
  }
  showLoading();
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
  hideLoading();
  btn.disabled = false;
  responseDiv.innerHTML = text;
}

/*
hide 되어 있는 loading 하면을 표출 시킨다. 
사용은 chat-gpt api 호출 하는 곳에서 사용된다.
*/
function showLoading(){
  loadingImg.src= '../images/0002-unscreen.gif';
  loadingMessage.innerHTML= "로딩중...";
}
/*
api의 loading이 끝나면 로딩 이미지 숨겨버린다.
*/
function hideLoading(){
  loadingImg.src= '../images/about.png';
  loadingMessage.innerHTML= " ";
}
