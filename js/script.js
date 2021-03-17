const weatherIcons = {

   "Rains": "wi wi-day-rain",
   "Clouds": "wi wi-day-cloudy",
   "Clear": "wi wi-day-sunny",
   "Snow": "wi wi-day-snow",
   "mist": "wi wi-day-fog",
   "Drizzle": "wi wi-day-sleet",

}

function capitalize(str) {
   return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true) {

   let town;

   if (withIP) {

      const ip = await fetch('https://api.ipify.org?format=json')
         .then(result => result.json())
         .then(json => json.ip)

      town = await fetch('https://freegeoip.app/json/' + ip)
         .then(result => result.json())
         .then(json => json.city)

   } else {

      town = document.querySelector('#town').textContent;
   }

   const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=72ec2d8c2a58ffd313820c1a35371a6e&lang=fr&units=metric`)
      .then(result => result.json())
      .then(json => json)

   displayWeatherInfos(meteo)
}

function displayWeatherInfos(data) {

   const name = data.name;
   const temperature = data.main.temp;
   const conditions = data.weather[0].main;
   const description = data.weather[0].description;

   document.querySelector('#town').textContent = name;
   document.querySelector('#temperature').textContent = Math.round(temperature);
   document.querySelector('#conditions').textContent = capitalize(description);

   document.querySelector('i.wi').className = weatherIcons[conditions];

   document.body.className = conditions.toLowerCase();
}



const town = document.querySelector('#town');

town.addEventListener('click', () => {

   town.contentEditable = true;
});

town.addEventListener('keydown', (e) => {

   if (e.keyCode === 13) {
      e.preventDefault();
      town.contentEditable = false;
      main(false);

   }
})

main();





