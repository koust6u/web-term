


var today = new Date();
var year = today.getFullYear();
var month = today.getMonth()+1;
var day = today.getDate()-1; //NASA API는 미국시간을 사용함으로 하루전의 정보를 받는다.
const fullDateString = year +"-"+month+"-"+day; 
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

async function translate(source){
  const TRANSLATE_API_URL= 'https://translation.googleapis.com/language/translate/v2?q='+source+'&source=en&target=ko&format=text&key=AIzaSyCycwm7Xo20JjCrZBHF3tRHooPlFyfvWZc';
  let response = await fetch(TRANSLATE_API_URL,{
    method:'POST'
  });
  let temp = await response.json();
  let ret =  await temp.data.translations[0].translatedText; 
  return ret;
}