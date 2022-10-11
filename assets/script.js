//global variables
let submitBtn = document.getElementById('submit')



function fetchData(cityName){

  let requestLocation = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=c81096e7c8f7e5aba437df08fab95a24`
  
  
  fetch(requestLocation)
    .then(function (response) {
  
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      let city = data.name;
      let date = data.dt_txt;
      let pic = data.weather[0].icon;
      let temp = data.main.temp;
      let windSpeed = data.wind.speed;
      let humidity = data.main.humidity;

      let cityPara = document.createElement("p");
      let datePara = document.createElement("p");
      let tempPara = document.createElement("p");
      let windSpeedPara = document.createElement("p");
      let humidityPara = document.createElement("p");
      let picPara = document.createElement("p");
      cityPara.innerHTML = `City Name: ${city}`;
      datePara.innerHTML = `Date: ${moment(date).format("MMM Do YYYY")}`;
      picPara.innerHTML = pic;
      tempPara.innerHTML = `Temp: ${temp}`;
      windSpeedPara.innerHTML = `Wind Speed: ${windSpeed}`;
      humidityPara.innerHTML = `Humidity: ${humidity}`;

      let currentWeatherDiv = document.getElementById('currentWeather');
      currentWeatherDiv.append(cityPara, datePara, picPara, tempPara, windSpeedPara, humidityPara);
      
      
      //function for the five day forcast data
      function fiveDayForcast(){
        let requestWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=c81096e7c8f7e5aba437df08fab95a24`;
        fetch(requestWeather)
        .then(function(response){

            return response.json()
        })

        .then(function(data){
          console.log(data)
          let dataList = data.list
          for (let i = 0; i < dataList.length; i+=8) {
            console.log(dataList[i])
            let forcastDiv = document.createElement("div");
            forcastDiv.style.flex = "25%";
            
            let parentDiv = document.createElement("div");

            //styling for the forcast table
            parentDiv.style.display ="block";
            parentDiv.style.border = "2px solid black"
            parentDiv.style.margin = "20px";




            //getting forcast data on page
            let forcastTempPara = document.createElement("p");
            let forcastHumidityPara = document.createElement("p");
            let forcastWindSpeedPara = document.createElement("p");
            let forcastDatePara = document.createElement("p");
            let forcastPicPara = document.createElement("p");
            forcastPicPara = dataList[i].weather[0].icon;
            forcastDatePara = `Date: ${moment(dataList[i].dt_txt).format("MMM Do YYYY")}`;
            forcastTempPara.innerHTML = `Temp: ${dataList[i].main.temp}`;
            forcastHumidityPara.innerHTML = `Humidity: ${dataList[i].main.humidity}`;
            forcastWindSpeedPara.innerHTML = `Wind Speed: ${dataList[i].wind.speed}`;

            let forcastWeatherDiv = document.getElementById('weatherForcast');
            parentDiv.append(forcastPicPara, forcastDatePara, forcastTempPara, forcastHumidityPara, forcastWindSpeedPara);
            forcastWeatherDiv.append(parentDiv);

            
          }
        })
      }

      fiveDayForcast();

    });

  
}

submitBtn.addEventListener("click", function(event){
  event.preventDefault();
  let locationChosen = document.getElementById('location').value;
  console.log(locationChosen);
  fetchData(locationChosen)
})