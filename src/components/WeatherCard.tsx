import React, {useEffect, useState} from 'react';
import {Card, Button, Spinner} from 'react-bootstrap';
import {fetchCityCoordinates, fetchCurrentWeather} from '../utils/api';
import {WeatherData} from '../types';

interface WeatherCardProps {
    city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({city}) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWeatherData = async () => {
            const coords = await fetchCityCoordinates(city);
            const weatherData = await fetchCurrentWeather(coords.latitude, coords.longitude);
            setWeather(weatherData);
            setLoading(false);
        };

        getWeatherData();
    }, [city]);

    if (loading) {
        return <Spinner animation="border"/>;
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{city}</Card.Title>
                <Card.Text>
                    {weather?.temperature}°C - {weather?.weather_description}
                </Card.Text>
                <Card.Text>Wind Speed: {weather?.windspeed} m/s</Card.Text>
                <Button href={`/weather/${city}`}>View Forecast</Button>
            </Card.Body>
        </Card>
    );
};

export default WeatherCard;
