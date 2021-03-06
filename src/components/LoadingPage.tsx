import React, { useState, useEffect } from "react";
import WeatherPage from "./WeatherPage";
import Geocode from "react-geocode";
import { Loader } from '@cognite/cogs.js';

type LoadingProps = {
    city: string
}

type ForecastType = {
    dt_txt: string,
    weather: {icon: string}[],
    main: {temp_max: number, temp_min: number}
}

type DailyType = {
    temp: {day: string},
    weather: {icon: string, description: string}[],
}

export default function LoadingPage({ city }: LoadingProps) {

    const [dailyData, setDailyData] = useState([]);
    const [forecastData, setForecastData] = useState([]);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        // Make loading screen visible for 2 sec
        setTimeout(() => {
            const apiKey = process.env.REACT_APP_API_KEY;
            Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY as string);
            Geocode.fromAddress(city).then(
                (response) => {
                    const coords = response.results[0].geometry.location;
                    setLat(coords.lat);
                    setLng(coords.lng);
                },
                (error) => {
                    console.error(error);
                }
            );
            if (lat !== 0 && lng !== 0) {
                Promise.all([
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&id=3143244&appid=${apiKey}&units=metric`),
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}&exclude=current,minutely,hourly,alerts&units=metric`)
                    ]).then((responses) => {
                        return Promise.all(responses.map(function (response) {
                            return response.json();
                        }));
                    }).then((data) => {
                        setForecastData(data[0].list.map((e: ForecastType) => {
                            return ({
                                date: e.dt_txt,
                                icon: e.weather[0].icon,
                                max: Math.round(e.main.temp_max), 
                                min: Math.round(e.main.temp_min)
                            });
                        })); // Variable for forecast API response
                        setDailyData(data[1].daily.map((e: DailyType) => {
                            return ({
                                icon: e.weather[0].icon,
                                description: e.weather[0].description,
                                temp: e.temp.day
                            })
                        })); // Variable for onecall API response
                        setDone(true); // State variable, determines when to show loading page
                    }).catch((error) => {
                        console.log(error);
                });
            }
        }, 2000);
    }, [city, lat, lng]);

    return(
        <>
            {!done ? (
                <Loader infoTitle={`Fetching weather data for ${city}`}/>
            ) : (
                // Display weather page when done fetching data
                // Send API responses as props
                <div>
                    <WeatherPage city = {city} forecast = {forecastData} daily = {dailyData}/>
                </div>
            )}
        </>
    );
}