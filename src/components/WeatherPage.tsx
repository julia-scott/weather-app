import React, { useState } from "react";
import logo from './../images/app_icon.png';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import CardComponent from "./CardComponent";

interface WeatherProps {
    daily: {
        icon: string,
        description: string,
        temp: number
    }[]
}

export default function WeatherPage({ daily }: WeatherProps) {
    const dates = getDates(); // Returns list of dates of today and next 4 days
    const [hourlyDay, setHourlyDay] = useState(''); // Determines what day to display hourly forecast
    const responsive = { // Display settings for react-multi-carousel
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 3,
          slidesToSlide: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1
        }
    };

    return (
        <>
            <div className="Weather-page">
                <div className="title">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>Oslo, Norway Weather Forecast</h1>
                </div>
                
                <Carousel 
                    className="card-carousel"
                    responsive={responsive}
                    showDots={false}
                    focusOnSelect={false}>
                    <div onClick={() => {setHourlyDay(dates[0])}}>
                        <CardComponent date = {dates[0]} image = {daily[0].icon} temp = {daily[0].temp} desc = {daily[0].description}/>
                    </div>
                    <div onClick={() => {setHourlyDay(dates[1])}}>
                        <CardComponent date = {dates[1]} image = {daily[1].icon} temp = {daily[1].temp} desc = {daily[1].description}/>
                    </div>
                    <div onClick={() => {setHourlyDay(dates[2])}}>
                        <CardComponent date = {dates[2]} image = {daily[2].icon} temp = {daily[2].temp} desc = {daily[2].description}/>
                    </div>
                    <div onClick={() => {setHourlyDay(dates[3])}}>
                        <CardComponent date = {dates[3]} image = {daily[3].icon} temp = {daily[3].temp} desc = {daily[3].description}/>
                    </div>
                    <div onClick={() => {setHourlyDay(dates[4])}}>
                        <CardComponent date = {dates[4]} image = {daily[4].icon} temp = {daily[4].temp} desc = {daily[4].description}/>
                    </div>
                </Carousel>
                
            </div>
        </>
    );
}

function getDates() {
    var dates = [];
    var startDate = new Date(); // Today's date
    var nextDate = new Date(startDate);

    // Get 4 dates past today
    for (var i = 1; i < 6; i++) {
        dates.push(nextDate);
        nextDate = new Date(startDate);
        startDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
    }
    dates = dates.map(formatDate) // Format: Tue, Oct 19, 2021
    return (dates);
}

function formatDate(date: Date) {
    const newDate = date.toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        year: 'numeric',
        month: 'short',
        timeZone: 'CET'
    });
    return (newDate);
}