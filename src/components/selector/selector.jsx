import React from 'react';
import './selector.css';

const Selector = props => {

    function select(e) {
        let country = e.target.value;
        props.onSelect(country);
    }
    return (
        <div className="selector">
            <i className="fas fa-chevron-down"></i>
            <select onChange={select} className="select-elem">
                <option value="none" selected className="select-option">Select a country</option>
                {props.listOfCountries.map(country => {
                    return <option value={country}>{country}</option>
                })}
            </select>
            
            <p className="subselect-text">Or click a country on the map.</p>
        </div>
    )
}

export default Selector;