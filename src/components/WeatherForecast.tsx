import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Spinner } from 'react-bootstrap';
import { fetchWeatherForecast } from '../utils/api'; // Убедитесь, что эта функция существует и возвращает правильные данные
import { WeatherForecastType } from '../types'; // Поменяли на WeatherForecastType

const WeatherForecast: React.FC = () => {
    const { city } = useParams<{ city: string }>(); // Типизация параметра 'city' из URL
    const [forecast, setForecast] = useState<WeatherForecastType[]>([]);  // Заменили на WeatherForecastType
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getForecast = async () => {
            if (!city) {
                setError('City is undefined');
                setLoading(false);
                return;
            }

            try {
                const data = await fetchWeatherForecast(city);
                setForecast(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch weather data');
                setLoading(false);
            }
        };

        getForecast();
    }, [city]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Button href="/">Back to Home</Button>
            <h2>{city} - 7 Days Forecast</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Min Temp</th>
                    <th>Max Temp</th>
                    <th>Weather</th>
                </tr>
                </thead>
                <tbody>
                {forecast.map((day) => (
                    <tr key={day.date}>
                        <td>{day.date}</td>
                        <td>{day.temperature_min}°C</td>
                        <td>{day.temperature_max}°C</td>
                        <td>{day.weather}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default WeatherForecast;
