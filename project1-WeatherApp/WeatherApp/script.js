const apiKey = "0c39d5c533da6862e9935ee0a1515438";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weather_Icon=document.querySelector(".weatherIcon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}+${city}+&appid=${apiKey}`);
    
    if(response.status==404){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
    }else{
        var data = await response.json();
    

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity +"%";
    document.querySelector(".wind").innerHTML=data.wind.speed +" km/h";

    if(data.weather[0].main=="Clouds"){
            weather_Icon.src = "images/clouds.png"

    }else if(data.weather[0].main=="Clear"){
            weather_Icon.src = "images/clear.png"

    }else if(data.weather[0].main=="Rain"){
            weather_Icon.src = "images/rain.png"

    }else if(data.weather[0].main=="Drizzle"){
            weather_Icon.src = "images/drizzle.png"

    }else if(data.weather[0].main=="Mist"){
            weather_Icon.src = "images/mist.png"
    }


    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";


    }



    

}

searchBtn.addEventListener("click" , ()=>{
    checkWeather(searchBox.value);
})


