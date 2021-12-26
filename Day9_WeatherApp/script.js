const $ = document.querySelector.bind(document);
let weather = {
   'apiKey': '58349ad23aa309afdf6fd024947aa2bb',
   fetchWeather: function (city) {
      fetch('https://api.openweathermap.org/data/2.5/weather?q='
         + city
         + '&units=metric&appid='
         + this.apiKey
      )
         .then(response => response.json())
         .then(data => this.showWeather(data))
   },
   showWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      console.log(name, icon, description, temp, humidity, speed);
      $('body').style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`
      $('.city').innerText = `Weather in ${name}`;
      $('.temp').innerText = `${temp}°C`;
      $('.icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      $('.description').innerText = description;
      $('.humidity').innerText = `Humidity: ${humidity}%`;
      $('.wind').innerText = `Wind speed : ${speed}km/h`;
      $('.weather').classList.remove('loading');
   },
   search: function () {
      this.fetchWeather($('.search-bar').value);
   }
}
$('.search button').addEventListener('click', () => {
   weather.search();
})
$('.search-bar').addEventListener('keypress', (event) => {
   if (event.key === 'Enter') {
      weather.search();
   }
})
weather.fetchWeather('hanoi')