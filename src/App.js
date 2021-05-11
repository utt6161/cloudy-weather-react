import './App.css';
import "./components/SearchBar.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from "react-bootstrap/Container";
import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import AppTitle from "./components/AppTitle";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {config} from "./networking/config";
import Loading from "./components/Loading";
import CitiesList from "./components/CitiesList";

import Fade from 'react-reveal/Fade';

function App() {

    const [isFetching, setFetchingStatus] = useState(false)

    const [city, setCity] = useState("")

    let cities

    // let toRender = <AppTitle title="Cloudy"/>

    const [toRender, setToRender] = useState(<AppTitle title="Cloudy"/>)

    let handleChange = (e) => {
        setCity({ value: e.target.value})
    }
    // will be there for now (or not)
    // console.log(city)

    async function search_for_city(city){
        const params = {
            params: {
                key: config.key,
                q: city
            }
        };
        let promise = await axios.get(config.search_link,params)
        return promise.data
    }

    // fun debug thingie that i successfully stole(borrowed) from stackoverflow

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function sleep() {
        await timeout(500);
    }


    async function searchForCity() {
        const params = {
            params: {
                key: config.key,
                q: city
            }
        };
        try {
            setToRender(<Loading/>)
            setFetchingStatus(true)
            const response = await axios.get(config.search_link,params)
            cities = response.data
            await sleep()
            setToRender(<CitiesList cities = {cities}/>)
            setFetchingStatus(false)
        } catch (e) {
            setToRender(<AppTitle title="Cloudy"/>)
            setFetchingStatus(false)
            console.log(e);
        }
    }


    return (
        <Container className="app">
            <Row>
                <InputGroup className="mb-3 search-bar">
                    <FormControl
                        onChange = {handleChange}
                        placeholder="City to search"
                        aria-label="City to search"
                        aria-describedby="city-to-search"
                    />
                    <InputGroup.Append>
                        <Button className="search-button" onClick = {searchForCity} >Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
            <Row>
                {toRender}
            </Row>

        </Container>
    );
}

export default App;
