var today = new Date();
var year = today.getFullYear();
var month = today.getMonth()+1;
var day = today.getDate()-1; //NASA API는 미국시간을 사용함으로 하루전의 정보를 받는다.
const fullDateString = year +"-"+month+"-"+day; 

/*
1. Open-web-api 사용 -> NASA의 APOD api를 사용한다. 하루에 하나의 우주 상식과 관련 사진들을 제공해준다.
2. JSON 기능 활용 -> JSON 기능을 통해 image, 정보, 제목등을 전달 받아 parsing해 사용자에게 정보를 제공해준다.

*/
async function func(){
  const NameOfPhoto = document.getElementById("title");
  const ContentOfPhoto = document.getElementById("paragraphs");
  const image = document.getElementById("image");
  const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=PQ8OAMhk3tAfm0AY25woHtmJhvaXyk8BQyQg5TGC&date=' + fullDateString;
  const response= await fetch(API_URL);
  const data = await response.json();
  NameOfPhoto.innerHTML = data.title;
  ContentOfPhoto.innerHTML = data.explanation;
  image.src = data.url;
  console.log(await data.title);
  NameOfPhoto.innerHTML = await translate(data.title);
  ContentOfPhoto.innerHTML = await translate(data.explanation);
}
/*
1. 잘못된 동작에 대한 에러 핸들링 -> 구글 번역 api에서 네트워크, 잘못된 문자열에 대한 번역 요청 시 웹 브라우저 개발자 도구에서 어디서 오류가 발생했는지
알 수 있도록 log를 남겨주고 사용자에게는 "잠시후 다시 이용해 주세요"라는 문구로 에러를 인지 시킨다.

2. open web api 사용 -> nasa에서 제공하는 open-web-api는 영어로 정보를 전달하기 때문에 google-번역 open-api를 거쳐 한국 사용자에게 한글로 된 번역 우주 정보를
전달 해준다.

*/
async function translate(source){
  const TRANSLATE_API_URL= 'https://translation.googleapis.com/language/translate/v2?q='+source+'&source=en&target=ko&format=text&key=AIzaSyCycwm7Xo20JjCrZBHF3tRHooPlFyfvWZc';
  try{
    let response = await fetch(TRANSLATE_API_URL,{
      method:'POST'
    });
    if (!response.ok) {
      throw new Error('번역 요청을 처리하는 동안 오류가 발생했습니다.');
    }
    let temp = await response.json();
    let ret =  await temp.data.translations[0].translatedText; 
    return ret;
  }
  catch (error) {
    console.log('번역 요청 중 에러가 발생했습니다:', error.message);
    return "잠시 후에 다시 이용 부탁드립니다.";
  }
  
}