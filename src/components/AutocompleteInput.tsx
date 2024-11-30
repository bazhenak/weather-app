import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { cities } from '../data/cities';


const AutocompleteInput: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim()) {
            const filteredSuggestions = cities.filter((city) =>
                city.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (city: string) => {
        setInputValue(city);
        setSuggestions([]);
    };

    return (
        <div>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Enter city name"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <Button variant="outline-secondary">Search</Button>
            </InputGroup>
            {suggestions && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteInput;
