import React from 'react';
import './country.css';

const Country = props => {
    const { country, cases, deaths, todayCases, todayDeaths, recovered, casesPerMillion } = props.data;
    const { formatNums } = props;
    if (country) {
    return (
        <div className="country">
            <h2 className="name">{country ? country : "Country"}</h2>
            <div className="data">
                <div className="cumulative">
                    <p>Total cases: {cases ? formatNums(cases) : '0'}</p>
                    <p>Total deaths: {deaths ? formatNums(deaths) : '0'}</p>
                    <p>Total recovered: {recovered ? formatNums(recovered) : '0'}</p>
                </div>
                <div className="today">
                    <p>New cases: {todayCases ? formatNums(todayCases) : '0'}</p>
                    <p>New deaths: {todayDeaths ? formatNums(todayDeaths) : '0'}</p>
                </div>
            </div>
        </div>
    )} else {
        return (
            null
        )
    }
}

export default Country;