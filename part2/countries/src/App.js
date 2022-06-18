import {useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    const handleFilterChanged = (event) => {
        setFilter(event.target.value)
    }

    const getCountries = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                const filteredCountries = response.data.filter(country => country.name.common.toLowerCase().includes(filter));
                setCountries(filteredCountries)
            })
    }

    useEffect(getCountries, [filter])

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChanged}/>
            <Countries countries={countries}/>
        </div>
    );
}

export default App;
