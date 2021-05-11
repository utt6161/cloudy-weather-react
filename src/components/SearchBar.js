import React from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button"
import "./SearchBar.css"

export default function SearchBar(){
    return(
        <div className = "search-bar">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="City to search"
                    aria-label="City to search"
                    aria-describedby="city-to-search"
                />
                <InputGroup.Append>
                <Button className = "search-button">Search</Button>
            </InputGroup.Append>
            </InputGroup>
        </div>
    );
};
