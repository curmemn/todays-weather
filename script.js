const APIKey = 'de9fb9286b8c0295445f16b49f8d46b9';
const weatherDescKo = [
{ 201: '가벼운 비를 동반한 천둥구름' },
{ 200: '비를 동반한 천둥구름' },
{ 202: '폭우를 동반한 천둥구름' },
{ 210: '약한 천둥구름' },
{ 211: '천둥구름' },
{ 212: '강한 천둥구름' },
{ 221: '불규칙적 천둥구름' },
{ 230: '약한 연무를 동반한 천둥구름' },
{ 231: '연무를 동반한 천둥구름' },
{ 232: '강한 안개비를 동반한 천둥구름' },
{ 300: '가벼운 안개비' },
{ 301: '안개비' },
{ 302: '강한 안개비' },
{ 310: '가벼운 적은비' },
{ 311: '적은비' },
{ 312: '강한 적은비' },
{ 313: '소나기와 안개비' },
{ 314: '강한 소나기와 안개비' },
{ 321: '소나기' },
{ 500: '악한 비' },
{ 501: '중간 비' },
{ 502: '강한 비' },
{ 503: '매우 강한 비' },
{ 504: '극심한 비' },
{ 511: '우박' },
{ 520: '약한 소나기 비' },
{ 521: '소나기 비' },
{ 522: '강한 소나기 비' },
{ 531: '불규칙적 소나기 비' },
{ 600: '가벼운 눈' },
{ 601: '눈' },
{ 602: '강한 눈' },
{ 611: '진눈깨비' },
{ 612: '소나기 진눈깨비' },
{ 615: '약한 비와 눈' },
{ 616: '비와 눈' },
{ 620: '약한 소나기 눈' },
{ 621: '소나기 눈' },
{ 622: '강한 소나기 눈' },
{ 701: '박무' },
{ 711: '연기' },
{ 721: '연무' },
{ 731: '모래 먼지' },
{ 741: '안개' },
{ 751: '모래' },
{ 761: '먼지' },
{ 762: '화산재' },
{ 771: '돌풍' },
{ 781: '토네이도' },
{ 800: '구름 한 점 없는 맑은 하늘' },
{ 801: '약간의 구름이 낀 하늘' },
{ 802: '드문드문 구름이 낀 하늘' },
{ 803: '구름이 거의 없는 하늘' },
{ 804: '구름으로 뒤덮인 흐린 하늘' },
{ 900: '토네이도' },
{ 901: '태풍' },
{ 902: '허리케인' },
{ 903: '한랭' },
{ 904: '고온' },
{ 905: '바람부는' },
{ 906: '우박' },
{ 951: '바람이 거의 없는' },
{ 952: '약한 바람' },
{ 953: '부드러운 바람' },
{ 954: '중간 세기 바람' },
{ 955: '신선한 바람' },
{ 956: '센 바람' },
{ 957: '돌풍에 가까운 센 바람' },
{ 958: '돌풍' },
{ 959: '심각한 돌풍' },
{ 960: '폭풍' },
{ 961: '강한 폭풍' },
{ 962: '허리케인' },
]

function getDescription(code) {
const result = weatherDescKo.find(item => Object.keys(item)[0] == code);
return result ? Object.values(result)[0] : '잘못된 값입니다';
}
function weather(e){
let city = document.getElementById('cityInput').value;
let showResult = document.getElementById('showResult');
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}&lang=ko`)
.then(response => response.json())
.then(data => {
let lat = data[0].lat; 
let lon = data[0].lon; 
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric&lang=ko`)
.then(response => response.json())
.then(weatherData => {
  let temp = weatherData.main.temp; //기온
  let tempMin = weatherData.main.temp_min; //최저기온
  let tempMax = weatherData.main.temp_max; //최고기온
  let feelsLike = weatherData.main.feels_like; //체감온도
  let descriptionId = weatherData.weather[0].id;//날씨설명
  let descriptionKor = getDescription(descriptionId);//날씨설명
  let windSpeed = weatherData.wind.speed; //풍속
  let humidity = weatherData.main.humidity;//습도
  let pressure = weatherData.main.pressure;//기압
  let icon = weatherData.weather[0].icon;

  showResult.innerHTML = `
  <div id="weatherResult">
  <h3>${city} 날씨</h3>
  <p>${descriptionKor}</p>
  <img src="" id="weatherIcon"></img>
  <p>
    기온: ${Math.round(temp)}℃<br>
    최저 기온: ${Math.round(tempMin)}℃<br>
    최고 기온: ${Math.round(tempMax)}℃<br>
    체감 온도: ${Math.round(feelsLike)}℃<br>
    풍속: ${windSpeed}m/s<br>
    습도: ${humidity}%<br>
    </p>
    </div>
    `
  console.log(weatherData);
  
  let iconImage = document.getElementById('weatherIcon');

  if(icon === '01d' || icon === '01n'){
    iconImage.setAttribute("src", "images/clear_sky.png");
  }else if(icon === '02d' || icon === '02n'){
    iconImage.setAttribute("src", "images/few_clouds.png");
  }
  else if(icon === '03d' || icon === '03n'){
    iconImage.setAttribute("src", "images/scattered_clouds.png");
  }
  else if(icon === '04d' || icon === '04n'){
    iconImage.setAttribute("src", "images/broken_clouds.png");
  }
  else if(icon === '09d' || icon === '09n'){
    iconImage.setAttribute("src", "images/shower_rain.png");
  }
  else if(icon === '10d' || icon === '10n'){
    iconImage.setAttribute("src", "images/rain.png");
  }
  else if(icon === '11d' || icon === '11n'){
    iconImage.setAttribute("src", "images/thunderstorm.png");
  }
  else if(icon === '13d' || icon === '13n'){
    iconImage.setAttribute("src", "images/snow.png");
  }
  else if(icon === '50d' || icon === '50n'){
    iconImage.setAttribute("src", "images/mist.png");
  }
})
.catch(error => console.error("Error: ", error));
})
.catch(error => console.error("Error: ", error));
}
