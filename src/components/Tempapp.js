import React, { useCallback, useEffect, useState } from "react";
import "./css/style.css";
// const { month, date, hours, mins, periods} = require("../components/time.js")
const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Patna");
  const [time, setTime] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=821ba040612bb2213f214bc7a830807f`;
      const response = await fetch(url);
      const resJson = await response.json();
      console.log(resJson);
      let new_dte = Date(resJson.dt * 1000 + resJson.timezone * 1000);
      setTime(new_dte.slice(0, 21));
      // setTime(new_dte);
      setCity(resJson.main);
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            className="inputField"
            defaultValue="patna"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        {!city ? (
          <p>No data found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <i className="fas fa-street-view"></i>
                {search}
              </h2>
              <h2 className="temp">{city.temp}&deg;C</h2>
              <h2 className="tempmin_max">
                {city.pressure}pa | {city.humidity}g.m-3
              </h2>
              <h3 className="temp">{time}</h3>
            </div>
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;
