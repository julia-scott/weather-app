import React, { useState } from 'react';
import { Title } from "./../styles/StyledComponents";
import OpenWeatherMap from 'openweathermap-ts';
import LoadingPage from './LoadingPage';

export default function CityPage() {
    const openWeather = new OpenWeatherMap({
        apiKey: process.env.REACT_APP_API_KEY as string
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [errorText, setErrorText] = useState('');
    const [dailyData, setDailyData] = useState([]);
    const [forecastData, setForecastData] = useState([]);
    const [done, setDone] = useState(false);

    const searchCity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        openWeather.getThreeHourForecastByCityName({
            cityName: searchTerm
        }).then((data) => {
            if (data.cod !== '200'){
                throw data.message;
            };
            setDone(true);
        }).catch((error) => {
            setErrorText(error);
            console.log(error);
        });
    };

    return(
        <>
            {!done ? (
                <>
                    <Title>
                        <h1>Select a location</h1>
                    </Title>
                    <form onSubmit={searchCity}>
                        <input 
                            type='text' 
                            placeholder="Search for location..." 
                            onChange={(e) => {setSearchTerm(e.target.value)}}
                        />
                    </form>
                    <p>{errorText}</p>
                </>
            ) : (
                <LoadingPage city={searchTerm} />
            )}
        </>
    );
};
