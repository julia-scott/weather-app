import React, { useEffect, useState, useRef } from 'react';
import { Title } from "./../styles/StyledComponents";
import OpenWeatherMap from 'openweathermap-ts';
import LoadingPage from './LoadingPage';

type CityProps = {
    e: React.FormEvent<HTMLFormElement>
}

export default function CityPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [done, setDone] = useState(false);
    const [errorText, setErrorText] = useState('');
    const isMounted = useRef(false);

    const searchCity = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setDone(false);
        const target = e.target as typeof e.target & {
            cityname: { value: string };
        };
        setSearchTerm(target.cityname.value);
    };

    useEffect(() => {
        if (isMounted.current) {
            const openWeather = new OpenWeatherMap({
                apiKey: process.env.REACT_APP_API_KEY as string
            });
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
        } else {
            isMounted.current = true;
        }
    }, [searchTerm]);

    return(
        <>
            <Title>
                <h1>Enter a city</h1>
            </Title>
            <form onSubmit={searchCity}>
                <input 
                    type='text'
                    name='cityname'
                    placeholder="Search for location..." 
                />
            </form>
            <p>{errorText}</p>
            {done ? (
                <LoadingPage city={searchTerm} />
            ) : (
                <></>
            )}
        </>
    );
};
