import React from 'react';
// import ReactDOM from 'react-dom';
import Spinner from './Components/Spinner';
import Current from './Components/Current';
import FiveDays from './Components/FiveDays';
import './App.css';
import Chart from './Components/Chart';

// ** hide it later
const apiKey = 'c10073d20b78554fc8f196d1bdf2d89f';

const apiURL = 'https://api.openweathermap.org/data/2.5/';

class App extends React.Component {

    state = {
        date: new Date(),
        current: '',
        errorMessage: '',

        // 
        fiveDays: {
            cod: '',
            list: []
        }
    };

    componentDidMount() {
        if (navigator.geolocation) {

            // get the current position of the device
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                // this.setState({current: {}});
                this.getWeather('lat=' + lat + '&lon=' + lon);
            },
                err => this.setState({ errorMessage: err.message })
            )
        }
    }

    getWeather(location) {
        //let th = this;
        // fetch data for Current weather
        fetch(apiURL + 'weather?' + location + '&appid=' + apiKey + '&units=metric')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    // ** later, get the whole data into current and pass it as props to its child
                    // ** eg. current: data or return data
                    current: {
                        country: data.sys.country,
                        city: data.name,
                        weather: data.weather[0].main,
                        temp: data.main.temp,
                        cloud: data.clouds.all,
                        humidity: Math.round(data.main.humidity),
                        wind: Math.round(data.wind.speed),
                        pressure: Math.round(data.main.pressure),
                        sunrise: data.sys.sunrise,
                        sunset: data.sys.sunset
                    }
                })
            })
            .catch(err => {
                // ** change the error msg
                this.setState({ errorMessage: '' });
            });

        // fetch data for Five days
        fetch(apiURL + 'forecast?' + location + '&appid=' + apiKey + '&units=metric')
            .then(response => response.json())
            .then(data => {
                // ** remove later? if it's not necessary
                let arr = data.list.filter(item => {
                    let time = new Date(item.dt * 1000);
                    if (time.getTimezoneOffset() === 360) {
                        if (time.toString().split(' ')[4] === '15:00:00') return item;
                    } else if (time.getTimezoneOffset() === 300) {
                        if (time.toString().split(' ')[4] === '16:00:00') return item;
                    }
                });
                this.setState({
                    fiveDays: {
                        cod: data.cod,
                        list: arr
                    }
                })
                // console.log(this.state.fiveDays.list);
            })
            .catch(err => {
                // ** change the error msg                
                this.setState({ errorMessage: '' });
            });
    }

    // 
    renderContent() {
        if (this.state.errorMessage && !this.state.current) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        if (!this.state.errorMessage && this.state.current) {
            return (
                <div>
                    <Current
                        current={this.state.current}
                        date={this.state.date.toString().split(' ').slice(0, 3).join(' ')}
                    />
                    {/* <div className='lineChart'>
                        <Chart />
                    </div> */}
                    <div className='week'>
                        {this.state.fiveDays.list.map(day => (
                            <FiveDays
                                cod={this.state.fiveDays.cod}
                                day={day.dt}
                                icon={day.weather[0].icon}
                                temp={Math.round(day.main.temp)}
                            />
                        ))}
                    </div>
                </div>
            );
        }
        return <Spinner message="Plesae accept the location request" />;
    }

    // 
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default App;