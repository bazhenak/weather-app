export interface WeatherData {
    temperature: number;
    weather_description: string;
    windspeed: number;
}

export interface WeatherForecastType {
    date: string;
    temperature_min: number;
    temperature_max: number;
    weather: string;
}