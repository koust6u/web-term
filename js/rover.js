const photoForm = document.getElementById('photoForm');
photoForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const cameraInput = document.getElementById('cameraInput');
  const solInput = document.getElementById('solInput');
  if(solInput.value < 0){
    alert("SOL에는 음수가 올 수 없어요!");
    solInput.value = '';
    return;
  }
  const camera = cameraInput.value;
  const sol = solInput.value;

  fetchData(camera, sol);
});

function fetchData(camera, sol) {
  const request = new XMLHttpRequest();
  const apiKey = 'x06cfvjO0bBhMISMBTJcOybN8e5YeizY1ycF261k';
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}&camera=${camera}`;

  request.open('GET', url, true);
  request.responseType = 'json';

  request.onload = function() {
    if (request.status === 200) {
      const data = request.response;
      const photos = data.photos;

      const photosContainer = document.getElementById('photosContainer');
      photosContainer.innerHTML = '';

      const errorDiv = document.getElementById("error")

      if(photos.length === 0){
        errorDiv.style.color = "red";
        errorDiv.innerText = "해당 날짜에는 curiosity호가 운행 하지 않았어요!! 다른 SOL값을 입력해주세요!";
      }
      else{
        errorDiv.innerText = "";
      }
      
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const imgSrc = photo.img_src;
        const photoId = photo.id;

        const photoContainer = document.createElement('div');
        photoContainer.classList.add('photo-container');

        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;

        const photoInfo = document.createElement('p');
        photoInfo.classList.add('photo-info');
      
        photoInfo.innerHTML = `
          <hr>
          <strong>Photo ID:</strong> ${photoId} <br>
          <strong>SOL:</strong> ${sol} <br>
          <strong>카메라 이름:</strong> ${photo.camera.name} <br>
          <strong>카메라 이름:</strong> ${photo.camera.full_name}<br>
          <strong>이미지 원본 주소:</strong> ${photo.img_src}<br>
          <strong>사진 날짜:</strong> ${photo.earth_date}<br>
          <hr>
        `;

        photoContainer.appendChild(imgElement);
        photoContainer.appendChild(photoInfo);

        photosContainer.appendChild(photoContainer);
      }
    } else {
      console.error('Error:', request.status);
    }
    const load = document.getElementById("loading");
    load.style.display = 'none';
  };

  request.send();

}



