import React from 'react';
import Country from "./Country";

const Countries = ({countries}) => {
    const renderDisplay = () => {
        if (countries.length === 1) {
            return (
                <Country country={countries[0]} detailed={true}/>
            )
        } else if (countries.length <= 10) {
            return (
                countries.map(country =>
                    <Country key={country.name.common} country={country} detailed={false}/>
                )
            )
        } else {
            return (
                <div>Too many matches, specify another filter.</div>
            )
        }
    }

    return (
        <div>
            {renderDisplay()}
        </div>
    )
}

export default Countries;