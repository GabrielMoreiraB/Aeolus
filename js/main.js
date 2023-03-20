const loadingScreen = () => {
    const progressBar = document.querySelector('progress')
    const loadingPage = document.querySelector('.main-loading')
    const mainHome = document.querySelector('.glass')
    let progressBarValue = 0;   

    const animationBar = (speed, add) => {

        if (add) {
            progressBarValue++;
        } else {
            progressBarValue = 0;
        }
        
        progressBar.setAttribute('value', progressBarValue);
        setTimeout(() => fillBar(), speed)

    }

    const fillBar = () => {
        if (progressBarValue < 101){
            mainHome.classList.add('hide')
            animationBar(30, true)
        } else {
            loadingPage.classList.add('hide')
            mainHome.classList.remove('hide')

        }

    }

    fillBar()
}

loadingScreen()






const apiKey = "66d6a338e191c48f2e21cc7e70a235a9";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const cityElement = document.querySelector("#city");
const countryElement = document.getElementById("country");
const tempElement = document.querySelector("#temperature span");
const descElement = document.getElementById("description");
const descImgElement = document.getElementById("Weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windyElement = document.querySelector(".wind span");

const weatherData = document.querySelector(".weather-data")

async function getWather(city){
    const apiweatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=matric&appid=${apiKey}&lang=pt_br`;
    const weatherURL = await fetch(apiweatherURL);
    const weatherJson = await weatherURL.json();
    return weatherJson
}

async function showWather(city){
    const data = await getWather(city)

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp * 0.1);
    descElement.innerText = data.weather[0].description;
    descImgElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`
    windyElement.innerText = `${data.wind.speed}km/h`

    weatherData.classList.remove('hide')
    cityInput.value = ''
}


searchBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    const city = cityInput.value;
    showWather(city);
    changeBackground ()
})

cityInput.addEventListener('keyup', (e)=>{
    if(e.code === 'Enter'){
        const city = e.target.value;
        showWather(city);
        changeBackground ()
    }
})


async function getBackgroundQuerie(){
    //chave unica do usuário, para outro projeto devemos gerar outra no site do unsplash.com, é gratuito 
    const CLIENT_ID = 'l-NQDu9pSBDCqSgjvIS_M821jxj13sIfOFTUk7iiz-Y'
    const randomIndex = Math.floor(Math.random() * 10) 
    const city = `${cityInput.value} wallpaper`;
    console.log(city)
    const imag = await fetch(`https://api.unsplash.com/search/photos?query=${city}&order_by=relevant&page=1&orientation=landscape&client_id=${CLIENT_ID}`);
    const imagConvert = await imag.json();
    const imgChosen = await imagConvert.results[randomIndex].urls.regular;
    return imgChosen
}


async function changeBackground (){
    const body = document.querySelector('body');
    const imagChosen = await getBackgroundQuerie();
    body.style.background = await `url('${imagChosen}') no-repeat center center`
    body.style.backgroundSize = "cover"
}

changeBackground ()