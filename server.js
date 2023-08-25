const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/getWeather', async (req, res) => {
  try {
    const cities = req.body.cities;
    const weatherData = {};

    const weatherPromises = cities.map(async city => {
      const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=6b37ef61f7014c78b783e79ce0a01043`);
      const temperature = response.data.data[0].temp; // Corrected extraction of temperature
      weatherData[city] = `${temperature}°C`;
    });

    await Promise.all(weatherPromises);

    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
