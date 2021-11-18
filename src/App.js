import React, { useEffect, useState } from "react";
import Axios from "axios";
import IsLoading from "./IsLoading";
import { GoLocation } from "react-icons/go";
import { WiSunset, WiSunrise } from "react-icons/wi";
import { MdWaves } from "react-icons/md";
import { GiGroundSprout } from "react-icons/gi";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [city, setCity] = useState("faisalabad");
  const [weatherMood, setWeatherMood] = useState("");

  const getWeather = async () => {
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c9c8dd5bbecdbacdce522ee57a5bc27c`
      );
      setLoading(false);
      setApiData(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const weatherIcon = () => {
    if (apiData?.data?.weather[0].description === "clear sky") {
      return setWeatherMood("https://openweathermap.org/img/wn/01d@2x.png");
    } else if (apiData?.data?.weather[0].description === "few clouds") {
      return setWeatherMood("https://openweathermap.org/img/wn/02d@2x.png");
    } else if (apiData?.data?.weather[0].description === "scattered clouds") {
      return setWeatherMood("https://openweathermap.org/img/wn/03d@2x.png");
    } else if (apiData?.data?.weather[0].description === "broken clouds") {
      return setWeatherMood("https://openweathermap.org/img/wn/04d@2x.png");
    } else if (apiData?.data?.weather[0].description === "shower rain") {
      return setWeatherMood("https://openweathermap.org/img/wn/09d@2x.png");
    } else if (apiData?.data?.weather[0].description === "rain") {
      return setWeatherMood("https://openweathermap.org/img/wn/10d@2x.png");
    } else if (apiData?.data?.weather[0].description === "thunderstorm") {
      return setWeatherMood("https://openweathermap.org/img/wn/11d@2x.png");
    } else if (apiData?.data?.weather[0].description === "snow") {
      return setWeatherMood("https://openweathermap.org/img/wn/13d@2x.png");
    } else if (apiData?.data?.weather[0].description === "mist") {
      return setWeatherMood("https://openweathermap.org/img/wn/50d@2x.png");
    } else {
      console.log("Error is happening");
    }
  };

  // Run when window load
  useEffect(() => {
    getWeather();
  }, []);
  // run when apidata Change
  useEffect(() => {
    weatherIcon();
  }, [apiData]);

  if (loading) {
    return (
      <main>
        <IsLoading />
      </main>
    );
  }

  const date = new Date();
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let currentmonth = date.getMonth();
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let year = date.getFullYear();

  let currentday = date.getDate();

  function msToTime(milli) {
    let seconds = Math.floor((milli / 1000) % 60);
    let minutes = Math.floor((milli / (60 * 1000)) % 60);

    return minutes + ":" + seconds;
  }

  return (
    <>
      <div className="container">
        <div className="weather-side">
          <div className="weather-gradient"></div>
          <div className="date-container">
            <h2 className="date-dayname">{days[day]}</h2>
            <span className="date-day">{`${currentday} ${month[currentmonth]} ${year}`}</span>
            <i>
              <GoLocation className="location_icon" />
            </i>
            <span className="location">
              {city}, {apiData?.data?.sys?.country}
            </span>
          </div>
          <div className="weather-container">
            <i className="weather-icon">
              <img src={weatherMood} alt="weather Icon" />
            </i>
            <h1 className="weather-temp">{apiData?.data?.main?.temp}°C</h1>
            <h3 className="weather-desc">
              {apiData?.data?.weather[0].description}
            </h3>
          </div>
        </div>
        <div className="info-side">
          <div className="today-info-container">
            <div className="today-info">
              <div className="precipitation">
                <span className="title">Pressure</span>
                <span className="value">
                  {apiData?.data?.main?.pressure} Hg
                </span>
                <div className="clear"></div>
              </div>
              <div className="humidity">
                <span className="title">HUMIDITY</span>
                <span className="value">{apiData?.data?.main?.humidity} %</span>
                <div className="clear"></div>
              </div>
              <div className="wind">
                <span className="title">WIND</span>
                <span className="value">{apiData?.data?.wind?.speed} km/h</span>
                <div className="clear"></div>
              </div>
            </div>
          </div>
          <div className="week-container">
            <ul className="week-list">
              <li className="Icon-Container">
                <i className="day-icon" data-feather="sun">
                  <WiSunrise className="later-icon" />
                </i>
                <span className="day-name">Sunrise</span>
                <span className="day-temp">
                  {msToTime(apiData?.data?.sys?.sunrise)} AM
                </span>
              </li>
              <li className="Icon-Container">
                <i className="day-icon">
                  <WiSunset className="later-icon" />
                </i>
                <span className="day-name">Sunset</span>
                <span className="day-temp">
                  {msToTime(apiData?.data?.sys?.sunset)} PM
                </span>
              </li>
              <li className="Icon-Container">
                <i className="day-icon">
                  <MdWaves className="later-icon" />
                </i>
                <span className="day-name">Sea-Level</span>
                <span className="day-temp">
                  {apiData?.data?.main?.sea_level} h
                </span>
              </li>
              <li className="Icon-Container">
                <i className="day-icon">
                  <GiGroundSprout className="later-icon" />
                </i>
                <span className="day-name">Grnd-Level</span>
                <span className="day-temp">
                  {apiData?.data?.main?.grnd_level} h
                </span>
              </li>
              <div className="clear"></div>
            </ul>
          </div>
          <div className="location-container form__group">
            <input
              type="input"
              className="form__field"
              placeholder="Name"
              name="name"
              id="name"
              required
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <label name="name" className="form__label">
              City
            </label>
            <button
              className="location-button"
              onClick={() => {
                getWeather();
              }}
            >
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
