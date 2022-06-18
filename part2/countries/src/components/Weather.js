import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({city}) => {
    const [weatherData, setWeatherData] = useState({})

    const getWeatherData = () => {
        const apikey = process.env.REACT_APP_WEATHER_API_KEY

        axios
            .get(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`)
            .then(response => {
                setWeatherData(response.data)
            })
    }

    const convertKphToMs = (kph) => {
        return (kph / 3.6).toFixed(2);
    }

    // ignore deps to do one load on component render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getWeatherData, [])

    return (
        <div>
            {weatherData && weatherData.current && weatherData.current.condition &&
                <>
                    <p>temperature {weatherData.current.temp_c} Celcius</p>
                    <img src={weatherData.current.condition.icon}/>
                    <p>wind {convertKphToMs(weatherData.current.wind_kph)} m/s</p>
                </>
            }
        </div>
    )
}

export default Weather;