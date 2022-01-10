const findButton = document.querySelector(".search-btn");
const searchBar = document.querySelector("#search-bar");
const searchLocation = document.querySelector(".location");
const apiKey = "87a2330723d8868a134cfb33f1e32e0a";
const units = "metric";
const cityName = document.querySelector(".city");
// const urlLatLong = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
const hamburgerBtn = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const hamburgerBars = document.querySelector(".bar");
const weatherData = document.querySelector(".weather-data");
const descImage = document.getElementById("descImg");
const Temperature = document.querySelector(".current-temp");
const tempMax = document.querySelector(".cur-max-temp");
const tempMin = document.querySelector(".cur-min-temp");
const searchValue = searchBar.value;
const daysBtn = document.querySelectorAll(".nav-col");

// Hamburger button code
hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

if (searchValue.length >= 3) {
  findButton.addEventListener("click", () => {
    if (searchValue.split(" ").length === 1) {
      cityName.innerHTML =
        searchValue.slice(0, 1).toUpperCase() + searchValue.substring(1);
    } else {
      cityName.innerHTML = searchValue
        .split(" ")
        .map((element) => {
          element.charAt(0).toUpperCase() + element.toLowerCase().substring(1);
        })
        .join(" ");
    }

    // cityName.innerHTML = searchValue;
    const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}`;
    latLongFunc(searchUrl);
  });
}

// function to change days navigator button color on click

const daysActiveBtn = (i) => {
  if (i === 0) {
    daysBtn[i].classList.add("active");
    for (let j = 1; j <= 6; j++) {
      daysBtn[i + j].classList.remove("active");
    }
  } else if (i === 6) {
    daysBtn[i].classList.add("active");
    for (let j = 0; j < 6; j++) {
      daysBtn[j].classList.remove("active");
    }
  } else if (i > 0 && i < 6) {
    daysBtn[i].classList.add("active");
    for (let j = 0; j < i; j++) {
      daysBtn[j].classList.remove("active");
    }
    for (let j = i + 1; j <= 6; j++) {
      daysBtn[j].classList.remove("active");
    }
  }
};

// Current Section Function -- displays all the weather details steps stuff  -- (step-04)

const curSection = (dataKey) => {
  const weatherDetails = document.querySelector(".weather-details");
  const curTemp = dataKey.temp.day.toFixed(1);
  const curTempMax = dataKey.temp.max.toFixed(0);
  const curTempMin = dataKey.temp.min.toFixed(0);
  const curDesc = dataKey.weather[0].description;
  const imgCode = dataKey.weather[0].icon;

  Temperature.innerHTML = curTemp;
  tempMax.innerHTML = curTempMax;
  tempMin.innerHTML = curTempMin;

  descImage.setAttribute("src", `./images/${imgCode}.png`);

  weatherDetails.innerHTML = curDesc
    .split(" ")
    .map((element) => {
      return element.charAt(0).toUpperCase() + element.substr(1).toLowerCase();
    })
    .join(" ");

  const curPressure = {
    Data: dataKey.pressure + " mmHg",
    title: "Pressure",
    imgPath: "./images/pressure.png",
  };
  const curHumidity = {
    Data: dataKey.humidity + " %",
    title: "Humidity",
    imgPath: "./images/humidity.png",
  };
  const curDewPoint = {
    Data: dataKey.dew_point + " %",
    title: "Dew Point",
    imgPath: "./images/dew-point.png",
  };
  const curWindSpeed = {
    Data: dataKey.wind_speed + " Km/h",
    title: "Wind Speed",
    imgPath: "./images/wind-speed.png",
  };
  const curWindDeg = {
    Data: dataKey.wind_deg + " deg",
    title: "Wind Degree",
    imgPath: "./images/wind-deg.png",
  };

  const curDataArr = [
    curPressure,
    curHumidity,
    curDewPoint,
    curWindSpeed,
    curWindDeg,
  ];

  let forecastData = "";

  curDataArr.forEach((element) => {
    forecastData += `<div class="temp">
                        <h1 class="current-time">${element.title}</h1>
                        <img class="stock-weather-img" src=${element.imgPath}>
                        <h2>${element.Data}</h2>
                        </div>`;
  });

  weatherData.innerHTML = forecastData;
};

// IP to location api function  -- Step(1) (Default) -- When page is loaded

const ip2Location = () => {
  fetch("http://ip-api.com/json/")
    .then((response) => response.json())
    .then((data) => {
      cityName.innerHTML = data.city;
      const urlLatLong = `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=${apiKey}`;

      latLongFunc(urlLatLong);
    });
};

ip2Location();

// City name to latitude and longitude extractor function  -- Step(2)

const latLongFunc = (urlLatLong) => {
  fetch(urlLatLong)
    .then((response) => response.json())
    .then((data) => {
      const latitude = data.coord.lat;
      const longitude = data.coord.lon;
      const mainUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`;

      console.log(mainUrl);
      weatherFunc(mainUrl);
    });
};

// Main execution function  -- Step(3)

const weatherFunc = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i <= 6; i++) {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const d1 = data.daily[i].dt * 1000;
        const day = new Date(d1);
        const weekDay = document.getElementById(`day${i}`);

        weekDay.innerHTML = days[day.getDay()];

        const onLoadDatakey = data.daily[0];

        // when windows load the default forecast of current day will be shown using the below line of code

        window.onload = () => {
          searchBar.value = "";
          curSection(onLoadDatakey);
          document.querySelectorAll(".nav-col")[0].classList.add("active");
        };

        window.onload();

        weekDay.addEventListener("click", (event) => {
          event.preventDefault();
          daysActiveBtn(i);
          dataKey = data.daily[i];
          curSection(dataKey);
        });
      }
    });
};
