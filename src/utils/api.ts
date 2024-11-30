export const fetchCityCoordinates = async (city: string) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const data = await response.json();
    return data.results[0];
};

export const fetchCurrentWeather = async (lat: number, lng: number) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&windspeed_unit=ms`);
    const data = await response.json();
    return data.current_weather;
};

export const fetchWeatherForecast = async (city: string) => {
    const coords = await fetchCityCoordinates(city);
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`);
    const data = await response.json();
    return data.daily;
};
