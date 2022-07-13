import {useState, useEffect} from 'react'
import axios from 'axios';

const Language = ({ language }) => {
  return (
    <li> {language} </li>
  )
}

const Country = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div>{country.name.common} <button onClick={() => setShow(prev => !prev)}>{show ? "Hide" : "Show"}</button></div>
      {show && <CountryInfo country={country} />}
    </div>
  )
}

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({
    weather: [
      {
        icon: ""
      }
    ],
    main: {
      temp: ""
    },
    wind: {
      speed: "",
    }
    })

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
    .then(response => {
      setWeather(response.data)
      console.log(response.data)
    })
  } ,[country])

  return(
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>Temperature {Math.round(weather.main.temp - 273.15)} °C</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"></img>
      <div>Wind {weather.wind.speed} m/s</div>
    </div>
  )

}

const CountryInfo = ({ country }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area} km²</div>
      
      <h3>Languages:</h3>
      { Object.entries(country.languages).map(([k, v]) => <Language key={k} language={v} /> ) }
      <br/>
      <div><img src={country.flags.svg} alt="flag" style={{"maxWidth": "200px"}} ></img></div>

      <Weather country={country} />

    </div>
  )
}

const Countries = ({ countries }) => {
  return (
    countries.length > 10
    ? <div>Too many matches, specify another filter</div>
    : countries.length === 1
      ? <CountryInfo country={countries[0]} />
      : countries.map(country => <Country key={country.cca2} country={country} />)
    
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
      console.log(response.data)
    })
  }
  
  ,[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log(filter)
  }

  const filterResults = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <input onChange={handleFilterChange} />
      {
        filter === ''
        ? <div>Specify a filter</div>
        : <Countries countries={filterResults} />
      }
    </div>
  );
}

export default App;
