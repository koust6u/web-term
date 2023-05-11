
document.addEventListener('DOMContentLoaded', function() {
  

  const selectList = document.getElementById('selectList');
  const planetRadio = document.getElementsByName('choice')[0];
  const satelliteRadio = document.getElementsByName('choice')[1];
  const calculateButton = document.getElementById('calculateButton');
  const massInput = document.getElementById('massInput');
  const radiusInput = document.getElementById('radiusInput');
  const resultElement = document.getElementById('resultValue');


  selectList.addEventListener('change', ()=> {
    const selectedResult = document.getElementById('selectedValue');
    const select = document.getElementById('selectList');
    var radios = document.getElementsByName('choice');
    var selectedValue;

    if (radios[0].checked) {
      selectedValue = "행성";
    }
    else if (radios[1].checked) {
      selectedValue = "위성";
    }
    selectedResult.innerHTML = "선택한 "+selectedValue +"의 탈출 속도는 "+select.value+"(km/s) 입니다."
  })

  setSelectList(planetList);
  
  planetRadio.addEventListener('change', () => {
    const selectedResult = document.getElementById('selectedValue');
    selectedResult.innerHTML = "선택한 행성의 탈출 속도는 617.5(km/s) 입니다.";
    setSelectList(planetList);
  });
  

  satelliteRadio.addEventListener('change', () => {
    const selectedResult = document.getElementById('selectedValue');
    selectedResult.innerHTML = "선택한 위성의 탈출 속도는 2.453(km/s) 입니다.";
    setSelectList(satelliteList);
  })
  
  function setSelectList(list) {
  // select 요소의 기존 옵션을 모두 제거합니다.
    selectList.innerHTML = '';
    // 새로운 옵션을 생성하여 select 요소에 추가합니다.
    list.forEach(item => {
    const option = document.createElement('option');
    option.value = item.value;
    option.text = item.text;
    selectList.appendChild(option);
    });
  }
});

//치올콥스키 로켓 방정식
function calculateFinalVelocity() {
  const initialVelocity = parseFloat(document.getElementById('initialVelocity').value);
  const exhaustVelocity = parseFloat(document.getElementById('exhaustVelocity').value);
  const initialMass = parseFloat(document.getElementById('initialMass').value);
  const finalMass = parseFloat(document.getElementById('finalMass').value);

  const finalVelocity = initialVelocity + exhaustVelocity * Math.log(initialMass / finalMass);

  document.getElementById('result').innerHTML = finalVelocity.toFixed(2);
}
//탈출 속도 방정식

function calculate() {
  const G = 6.67430e-11;
  const M = parseFloat(document.getElementById("massInput").value)* 100000000;
  const r = parseFloat(document.getElementById("radiusInput").value);

  const ve = Math.sqrt((2 * G * M) / r);

  document.getElementById("ve").innerHTML = ve.toFixed(3);
}

const planetList = [
  {value: '617.5', text: '태양'},
  {value: '4.3', text: '수성'},
  {value: '10.3', text: '금성'},
  {value: '11.2', text: '지구'},
  {value: '5.0', text: '화성'},
  {value: '59.6', text: '목성'},
  {value: '35.6', text: '토성'},
  {value: '21.3', text: '천왕성'},
  {value: '23.8', text: '해왕성'}
];

const satelliteList = [
  {value: '2.453', text: '달'},
  {value: '2.639', text: '타이탄'},
  {value: '2.025', text: '유로파'},
  {value: '2.741', text: '가니메데'},
  {value: '0.006', text: '데이모스'},
  {value: '0.001', text: '포보스'}
];



