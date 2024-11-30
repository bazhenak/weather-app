import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WeatherCard from './components/WeatherCard';
import WeatherForecast from './components/WeatherForecast';
import { cities } from './data/cities';
import AutocompleteInput from './components/AutocompleteInput';
import { Container, Row, Col } from 'react-bootstrap';
import './styles/Global.scss';

const App: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Container>
                        <Row>
                            <Col xs={12} md={6} lg={4}>
                                <AutocompleteInput />
                            </Col>
                        </Row>
                        <Row>
                            {cities.map((city) => (
                                <Col key={city} xs={12} md={6} lg={4}>
                                    <WeatherCard city={city} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                }
            />
            <Route path="/weather/:city" element={<WeatherForecast />} />
        </Routes>
    );
};

export default App;
