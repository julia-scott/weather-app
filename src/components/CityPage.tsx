import React, { useEffect, useState, useRef } from 'react';
import { CityTitle } from "./../styles/StyledComponents";
import OpenWeatherMap from 'openweathermap-ts';
import LoadingPage from './LoadingPage';
import { Input } from '@cognite/cogs.js';

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
        setErrorText(''); // Reset errortext on submit
        setDone(false); // Display loading page for every search
        const target = e.target as typeof e.target & {
            cityname: { value: string };
        };
        setSearchTerm(target.cityname.value);
        target.cityname.value = ''; //Clear search bar after submit
    };

    useEffect(() => {
        // Do not execute on mount
        if (isMounted.current && searchTerm) {
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
            <CityTitle>
                <h4>Enter a location:</h4>
                <form onSubmit={searchCity}>
                    <Input 
                        error={errorText}
                        iconPlacement="right"
                        icon="Search"
                        type='text'
                        name='cityname'
                        placeholder="Search for location..."
                    />
                </form>
            </CityTitle>
            {done ? (
                <LoadingPage city={searchTerm} />
            ) : (
                <>
                </>
            )}
        </>
    );
};
