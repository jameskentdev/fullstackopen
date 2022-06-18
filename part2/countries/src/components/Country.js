import React from 'react';
import {useState} from "react";
import Weather from "./Weather";

const Country = ({country, detailed}) => {
    const [showDetailed, setShowDetailed] = useState(false)

    const handleOnClick = () => {
        setShowDetailed(!showDetailed)
    }

    if (detailed === true || showDetailed === true) {
        return (
            <div>
                <h2>
                    {country.name.common}
                </h2>
                {showDetailed &&
                    <button onClick={handleOnClick}>
                        hide
                    </button>
                }
                <div>
                    capital {country.capital[0]}
                </div>
                <div>
                    area {country.area}
                </div>
                <h3>
                    languages:
                </h3>
                <ul>
                    {Object.entries(country.languages).map(([key, value]) =>
                        <li key={key}>{value}</li>
                    )}
                </ul>
                <img src={country.flags.png}/>
                <Weather city={country.capital[0]}/>
            </div>
        )
    } else {
        return (
            <div>
                {country.name.common}
                <button onClick={handleOnClick}>
                    show
                </button>
            </div>
        )
    }
}

export default Country;