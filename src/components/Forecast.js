import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Forecast.css"
import {config} from "../networking/config"

import humidity from "../humidity.png"
import wind from "../wind.png"
import pressure from "../pressure.png"
import sunset from "../sunset.png"
import sunrise from "../sunrise.png"

export default function Forecast(props){

    const [forecast,setForecast] = useState(props.forecast)

    return (
        <>
            <Row className = "justify-content-md-center">
                <div className="current-panel w-auto">
                    <p className = "m-1 text-center">{forecast.location.name}, {forecast.location.region}, {forecast.location.country}</p>
                    <p className = "m-1 text-center">Updated at: {forecast.current.last_updated}</p>
                    <p className = "current-temp m-0 text-center">{forecast.current.temp_c}{config.celsius}</p>
                    <Row className = "d-flex justify-content-around">
                        <p className = "w-auto">Min: {forecast.forecast.forecastday[0].day.mintemp_c}{config.celsius}</p>
                        <p className = "w-auto">Max: {forecast.forecast.forecastday[0].day.maxtemp_c}{config.celsius}</p>
                    </Row>
                </div>
            </Row>
            <Row className = "justify-content-md-center">
                <div className="current-panel w-auto">

                </div>
            </Row>
            <Row>

            </Row>
            <Row className = "justify-content-center">

                <Col md="auto" className = "current-panel">
                        <img className = "condition-logo" src = {forecast.current.condition.icon} alt="condition icon"/>
                        <p className = "text-center">{forecast.current.condition.text}</p>
                </Col>
                <Col md="auto" className = "current-panel">
                        <img className = "condition-logo no-color" src = {humidity} alt="humidity icon"/>
                        <p className = "text-center">{forecast.current.humidity}%</p>
                </Col>
                <Col md="auto" className = "current-panel">
                    <img className = "condition-logo no-color" src = {pressure} alt="pressure icon"/>
                    <p className = "text-center">{forecast.current.pressure_mb} mb</p>
                </Col>
                <Col md="auto" className = "current-panel">
                    <img className = "condition-logo no-color" src = {wind} alt="wind icon"/>
                    <p className = "text-center">{forecast.current.wind_kph} k/h</p>
                </Col>
                <Col md="auto" className = "current-panel">
                    <img className = "condition-logo no-color" src = {sunrise} alt="sunrise icon"/>
                    <p className = "text-center">{forecast.forecast.forecastday[0].astro.sunrise}</p>
                </Col>
                <Col md="auto" className = "current-panel">
                    <img className = "condition-logo no-color" src = {sunset} alt="sunset icon"/>
                    <p className = "text-center">{forecast.forecast.forecastday[0].astro.sunset}</p>
                </Col>
            </Row>
        </>
    )
}
