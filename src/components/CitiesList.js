import React, {useState} from "react";
import "./CitiesList.css"
import ListGroup from "react-bootstrap/ListGroup";
import {config} from "../networking/config";
import Loading from "./Loading";
import axios from "axios";
import AppTitle from "./AppTitle";
import {number} from "prop-types";
import Forecast from "./Forecast";

export default function CitiesList(props){

    // fun debug thingie that i successfully stole(borrowed) from stackoverflow

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function sleep() {
        await timeout(500);
    }

    let forecast;

    const cities = props.cities.map((city) =>
        <ListGroup.Item key={city.id} className = "city-item" onClick = {() => {fetch_forecast(city.lat + "," + city.lon)}}>
            {city.name}
        </ListGroup.Item>)

    // at first render we will display a list of cities based on search results from api

    const [toRender, setToRender] = useState(
        <ListGroup className = "cities-list mx-auto">
            {cities}
        </ListGroup>)

    const [isFetching, setFetchingStatus] = useState(false)

    async function fetch_forecast(latlong) {  // accepts longitude and latitude of the city, to be more precise
        const params = {
            params: {
                key: config.key,
                q: latlong,
                days: 3,
                aqi: "yes",
                alerts: "no"
            }
        };
        try {
            setToRender(<Loading/>)
            setFetchingStatus(true)
            const response = await axios.get(config.forecast_link,params)
            forecast = response.data
            await sleep()
            setToRender(<Forecast forecast = {forecast}/>)
            setFetchingStatus(false)
        } catch (e) {
            setToRender(<AppTitle title="Cloudy"/>)
            setFetchingStatus(false)
            console.log(e);
        }
    }

    return(
        <>
            {toRender}
        </>
    );
};
