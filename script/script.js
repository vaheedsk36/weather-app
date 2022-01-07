const findButton = document.querySelector('.search-btn');
const searchBar = document.querySelector('#search-bar');
const searchLocation = document.querySelector('.location');
const apiKey = '87a2330723d8868a134cfb33f1e32e0a';
const cityName = 'London';
const units = 'metric';
const urlLatLong = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
const temperatures = [];
const tempDesc = document.getElementById('desc');

const maxTemp = [];
const minTemp = [];
const iconCode = [];
const windSpeed = [];
const humidity = [];
const windDeg = [];
const pressure = [];

const imgSrc = [];
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

fetch(urlLatLong)
.then(response=>response.json())
.then((data)=>{
    const latitude = data.coord.lat;
    const longitude = data.coord.lon;
    const mainUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`;

    console.log(mainUrl);
    weatherFunc(mainUrl);
})

const weatherFunc = (url)=>{
    fetch(url)
    .then(response=>response.json())
    .then((data)=>{
        // console.log(data);
        

        for(let i=0;i<7;i++){
            maxTemp.push(data.daily[i].temp.max.toFixed(1));
            minTemp.push(data.daily[i].temp.min.toFixed(1));
            humidity.push(data.daily[i].humidity);
            // tempDesc.push(data.daily[i].weather[0].description);
            iconCode.push(data.daily[i].weather[0].icon);
            windSpeed.push(data.daily[i].wind_speed);
            windDeg.push(data.daily[i].wind_deg);
            pressure.push(data.daily[i].pressure);


            imgSrc.push(`https://openweathermap.org/img/wn/${iconCode[i]}@2x.png`);
        }
    
        for(let i=0;i<7;i++){

            const mainTemp = data.current.temp.toFixed(1);
            tempDesc.innerHTML = data.current.weather[0].description;
            document.getElementById(`temp-${i}`).innerHTML = mainTemp;
            document.getElementById(`humidity-${i}`).innerHTML = humidity[i];
            document.getElementById('location').innerHTML = cityName;
            // document.getElementById(`max-temp-${i}`).innerHTML = maxTemp[i];
            document.getElementById(`min-temp-${i}`).innerHTML = minTemp[i];
            document.getElementById(`img-${i}`).src = imgSrc[i];
            document.getElementById(`wind-${i}`).innerHTML = windSpeed[i];
            document.getElementById(`wind-deg-${i}`).innerHTML = windDeg[i];
            document.getElementById(`pressure-${i}`).innerHTML = pressure[i];


            const d1 = data.daily[i].dt*1000;
            const day = new Date(d1);
            document.getElementById(`day-${i}`).innerHTML = days[day.getDay()];
            
        }

})
}



// Temperature images declarations

/*
const temperatures = [];
const tempDesc = [];
const iconCode = [];
const windSpeed = [];
const imgSrc = [];


console.log(url);

fetch(url)
.then(response=>response.json())
.then((data)=>{
    for(let i=0;i<7;i++){
        temperatures.push(data.list[i].main.temp.toFixed(1));
        tempDesc.push(data.list[i].weather[0].description);
        iconCode.push(data.list[i].weather[0].icon);
        windSpeed.push(data.list[i].wind.speed);
        imgSrc.push(`https://openweathermap.org/img/wn/${iconCode[i]}@2x.png`);
    }

    for(let i=0;i<7;i++){
        document.getElementById(`temp-${i}`).innerHTML = temperatures[i]+'&deg;C';
        document.getElementById(`img-${i}`).src = imgSrc[i];
        tempDesc[i]
        windSpeed[i]
        
        


    
  

}});



setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hours12Format = hour >=13?hour%2:hour;
    const minutes = time.getMinutes();
    const ampm = time>=12?'AM':'PM';

},1000);


*/













// const tuesdayTemp = document.getElementById('tuesday-temp');
// const wednesdayTemp = document.getElementById('wednesday-temp');
// const thursdayTemp = document.getElementById('thursday-temp');
// const fridayTemp = document.getElementById('friday-temp');
// const saturdayTemp = document.getElementById('saturday-temp');
// const sundayTemp = document.getElementById('sunday-temp');

// const tempDesc = data.weather[0].description;
// const iconCode = data.weather[0].icon;
// const imgsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
// const windSpeed = data.wind.speed;
// console.log(temp,tempDesc,iconCode,windSpeed);
// mondayTemp.innerHTML = `${temp}&deg;C`;
// mondayImg.src = `${imgsrc}`;

// const mondayImg = document.getElementById('monday-img');
// const tuesdayImg = document.getElementById('tuesday-img');
// const wednesdayImg = document.getElementById('wednesday-img');
// const thursdayImg = document.getElementById('thursday-img');
// const fridayImg = document.getElementById('friday-img');
// const saturdayImg = document.getElementById('saturday-img');
// const sundayImg = document.getElementById('sunday-img');