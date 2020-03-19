import React from 'react';
import './global.css';

const Global = props => {
    const { cases, deaths, recovered, formatNums } = props;
    return (
        <div className="global">
            <h2>Global COVID-19 Impact</h2>
            <div className="data">
                <div><span className="label">Cases</span> <span>{cases ? formatNums(cases) : ''}</span></div>
                <div><span className="label">Deaths</span> <span>{deaths ? formatNums(deaths) : ''}</span></div>
                <div><span className="label">Recoveries</span> <span>{recovered ? formatNums(recovered) : ''}</span></div>
            </div>
        </div>
    )
}

export default Global;