import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Global from './components/global/global';
import Country from './components/country/country';
import Selector from './components/selector/selector';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


class App extends Component {

  state = {
    globalStats: [],
    allCountries: [],
    countryStats: [],
    data: [],
    listOfCounties: [],
    currentCountry: null,
  }

  getGlobal = () => {
    axios.get("https://coronavirus-19-api.herokuapp.com/all")
      .then(stats => {
        this.setState({
          globalStats: stats.data,
        });
      })
  }

  getAllCountries = () => {
    axios.get("https://coronavirus-19-api.herokuapp.com/countries")
      .then(stats => {
        this.setState({
          data: [...stats.data]
        });
      })
      .then(() => {
        let countries = [];
        for (let country of this.state.data) {
          countries.push(country.country)
        }
        countries.sort();
        this.setState({
          listOfCounties: countries,
        })
      })
  }

  getCountry = (country) => {
    if (country === "United States of America") { country = "USA"};
    if (country === "Dem. Rep. Congo") { country = "DRC"};
    if (country === "United Kingdom") { country = "UK"}
    axios.get("https://coronavirus-19-api.herokuapp.com/countries/" + country)
      .then(stats => {
        this.setState({
          countryStats: stats.data
        });
      })
  }

  selectCountry = (geo) => {
    this.getCountry(geo);
  }

  formatNums = (num) => {
    let arr = [...num.toString()].reverse();
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        if (i%3 === 0 && i !== 0) {
          str = ","+str
        }
        str = arr[i]+str;
    }

    return str;
  }

  componentDidMount() {
    this.getGlobal();
    this.getAllCountries();
  }

  render() {
    const { globalStats, countryStats } = this.state;
    return (
      <div className="App">
        <Global formatNums={this.formatNums} cases={globalStats.cases} deaths={globalStats.deaths} recovered={globalStats.recovered}/>
        <div className="body">
          <div className="sidebar">
            <Selector listOfCountries={this.state.listOfCounties} onSelect={this.selectCountry}/>
            <Country data={countryStats} formatNums={this.formatNums} />
          </div>
          <div className="map">
            <ComposableMap style={{marginTop: "-5%", marginBottom: "-8%", marginRight: "5%"}}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    return <Geography 
                      key={geo.rsmKey} 
                      geography={geo} 
                      onClick={() => this.selectCountry(geo.properties.NAME)}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                          transition: "fill 500ms ease-out"
                        },
                        hover: {
                          fill: "#7d26cd",
                          stroke: "#607D8B",
                          strokeWidth: 1,
                          outline: "none",
                        }
                    }}
                      />
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

