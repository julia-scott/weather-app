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
    const [done, setDone] = useState(false);

    const searchCity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if valid location name
        Promise.all([
            openWeather.getCurrentWeatherByCityName({
                cityName: searchTerm
            }),
            openWeather.getThreeHourForecastByCityName({
                cityName: searchTerm
            })]).then((responses) => {
                console.log(responses);
                return Promise.all(responses.map(function (response) {
                    if (response.cod != 200){
                        throw response;
                    };
                    return response;
                }));
            }).then((data) => {
                console.log(data[0]);
                console.log(data[1]);
                setDone(true); // State variable, determines when to show loading page
            }).catch((error) => {
                setErrorText(error.message);
                console.log(error.message);
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
