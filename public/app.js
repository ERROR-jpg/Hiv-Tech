// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('getWeatherButton');
    const cityInput = document.getElementById('cityInput');
    const weatherTableBody = document.querySelector('#weatherResults table tbody');
  
    getWeatherButton.addEventListener('click', async () => {
      const cities = cityInput.value.split(',').map(city => city.trim());
  
      if (cities.length === 0) {
        weatherTableBody.innerHTML = '<tr><td colspan="2">Please enter city names.</td></tr>';
        return;
      }
  
      const response = await fetch('/getWeather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cities }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        weatherTableBody.innerHTML = '';
  
        for (const city of cities) {
          const temperature = data.weather[city];
  
          const newRow = weatherTableBody.insertRow();
          const cityCell = newRow.insertCell();
          const tempCell = newRow.insertCell();
  
          cityCell.textContent = city;
          tempCell.textContent = temperature;
        }
      } else {
        weatherTableBody.innerHTML = '<tr><td colspan="2">Please Enter Valid Cities</td></tr>';
      }
    });
  });
  