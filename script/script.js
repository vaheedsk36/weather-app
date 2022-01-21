const findButton = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");
const apiKey = "87a2330723d8868a134cfb33f1e32e0a";
const units = "metric";
const cityName = document.querySelector(".city");
const hamburgerBtn = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const hamburgerBars = document.querySelector(".bar");
const weatherData = document.querySelector(".weather-data");
const descImage = document.getElementById("descImg");
const dayTemp = document.querySelector(".day-temp");
const eveningTemp = document.querySelector(".evening-temp");
const morningTemp = document.querySelector(".morning-temp");
const nightTemp = document.querySelector(".night-temp");
const tempMax = document.querySelector(".cur-max-temp");
const tempMin = document.querySelector(".cur-min-temp");
const searchValue = searchBar.value;
const daysBtn = document.querySelectorAll(".nav-col");
const dateTime = document.querySelector(".date-time");
const dropHeader = document.querySelector(".drop-down-header");
const detailsNavigator = document.querySelector(".details-navigator");

// Responsive hamburger button code
hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active-menu");
  navMenu.classList.toggle("active-menu");
});

// codeblock for dropdown button
dropHeader.addEventListener("click", (event) => {
  event.preventDefault();
  detailsNavigator.classList.toggle("nav-activator");

  document.querySelector(".weather-data").addEventListener("click", () => {
    detailsNavigator.classList.remove("nav-activator");
  });
});

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

const curSection = (dataKey) => {
  const weatherDetails = document.querySelector(".weather-details");
  const curTemp = dataKey.temp.day.toFixed(1);
  const morning = dataKey.temp.morn.toFixed(1);
  const evening = dataKey.temp.eve.toFixed(1);

  const night = dataKey.temp.night.toFixed(1);
  const curTempMax = dataKey.temp.max.toFixed(0);
  const curTempMin = dataKey.temp.min.toFixed(0);
  const curDesc = dataKey.weather[0].description;
  const imgCode = dataKey.weather[0].icon;
  const celsiusBtn = document.querySelector(".celsius");
  const farenheitBtn = document.querySelector(".farenheit");

  const celsiusFn = () => {
    dayTemp.innerHTML = curTemp + "&deg;";
    morningTemp.innerHTML = morning + "&deg;";
    eveningTemp.innerHTML = evening + "&deg;";
    nightTemp.innerHTML = night + "&deg;";
    tempMax.innerHTML = curTempMax + "&deg;";
    tempMin.innerHTML = curTempMin + "&deg;";
    celsiusBtn.classList.add("unit-active");
    farenheitBtn.classList.remove("unit-active");
  };

  celsiusFn();

  const farenheitFn = (event) => {
    dayTemp.innerHTML = ((9 / 5) * curTemp + 32).toFixed(1) + "&deg;";
    morningTemp.innerHTML = ((9 / 5) * morning + 32).toFixed(1) + "&deg;";
    nightTemp.innerHTML = ((9 / 5) * night + 32).toFixed(1) + "&deg;";
    eveningTemp.innerHTML = ((9 / 5) * evening + 32).toFixed(1) + "&deg;";
    tempMax.innerHTML = ((9 / 5) * curTempMax + 32).toFixed(1) + "&deg;";
    tempMin.innerHTML = ((9 / 5) * curTempMin + 32).toFixed(1) + "&deg;";
    celsiusBtn.classList.remove("unit-active");
    farenheitBtn.classList.add("unit-active");
  };

  celsiusBtn.addEventListener("click", celsiusFn);
  farenheitBtn.addEventListener("click", farenheitFn);

  descImage.setAttribute("src", `./images/${imgCode}.png`);
  document.querySelector(
    ".current"
  ).style.backgroundImage = `url("./images/weather-bg/${imgCode}.jpg")`;

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
    Data: dataKey.humidity + "%",
    title: "Humidity",
    imgPath: "./images/humidity.png",
  };
  const curDewPoint = {
    Data: dataKey.dew_point + "%",
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
  const curWindGust = {
    Data: dataKey.wind_gust + " deg",
    title: "Wind Gust",
    imgPath: "./images/wind-gust.png",
  };

  const curDataArr = [
    curPressure,
    curHumidity,
    curDewPoint,
    curWindSpeed,
    curWindDeg,
    curWindGust,
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
  fetch("https://ipinfo.io/json?token=77d604e88599f2")
    .then((response) => response.json())
    .then((data) => {
      // Here the city name will be by default in sentence case because the data from api itself gives it in such format

      cityName.innerHTML = data.city;
      const urlLatLong = `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=${apiKey}`;

      latLongFunc(urlLatLong);
    });
};

ip2Location();

// Search location function when the the search bar is triggered it is executed

const searchLocation = (value1) => {
  const urlLatLong = `https://api.openweathermap.org/data/2.5/weather?q=${value1}&appid=${apiKey}`;

  latLongFunc(urlLatLong);
};

// This function changes the city name to sentence case
const cityNameChanger = () => {
  if (searchBar.value.split(" ").length === 1) {
    cityName.innerHTML =
      searchBar.value.slice(0, 1).toUpperCase() + searchBar.value.substring(1);
  } else {
    cityName.innerHTML = searchBar.value
      .split(" ")
      .map((element) => {
        return (
          element.charAt(0).toUpperCase() + element.toLowerCase().substring(1)
        );
      })
      .join(" ");
  }
};

// This function triggers the activates the searchLocation function when clicked on the find button

findButton.addEventListener("click", () => {
  console.log(searchBar.value);
  searchLocation(searchBar.value);
  cityNameChanger();
});

// This function triggers the activates the searchLocation function when enter button is clicked in the searchbar

searchBar.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    searchLocation(searchBar.value);
    cityNameChanger();
  }
});

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

// Date function

const dateFn = (dateArg) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];

  const Year = dateArg.getFullYear();
  const dateNum = dateArg.getDate();
  const Month = months[dateArg.getMonth()];
  dateTime.innerHTML = `${Month} ${dateNum},${Year}`;
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
        const weekDay = document.querySelector(`.day${i}`);

        weekDay.innerHTML = days[day.getDay()];

        const onLoadDatakey = data.daily[0];

        // when windows load the default forecast of current day will be shown using the below line of code

        window.onload = () => {
          searchBar.value = "";
          curSection(onLoadDatakey);
          document.querySelectorAll(".nav-col")[0].classList.add("active");
          dropHeader.innerHTML = document.querySelector(".day0").text;

          const curDate = new Date(data.daily[0].dt * 1000);
          dateFn(curDate);
        };

        window.onload();

        weekDay.addEventListener("click", (event) => {
          event.preventDefault();
          daysActiveBtn(i);
          dataKey = data.daily[i];
          dropHeader.innerHTML = weekDay.text;
          dateFn(day);
          curSection(dataKey);
        });
      }
    });
};
