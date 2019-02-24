import React, {Fragment} from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Font } from 'expo';

import { WeatherBody, WeatherHeader } from './components';
import { getUserLocation } from './utils/locationService';
import { API_KEY } from './utils/APIKey';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    periodOfDay: 'day',
    sunset: 0,
    city: "",
    icon: "",
    weatherCondition: null
  };

  componentDidMount() {
    Font.loadAsync({
      'raleway': require('./assets/fonts/Raleway/Raleway-ExtraBold.ttf'),
      'raleway-light': require('./assets/fonts/Raleway/Raleway-Medium.ttf'),
      'raleway-semi': require('./assets/fonts/Raleway/Raleway-SemiBold.ttf')
    });

    // gets the users location and sets the results to lcoal state
    getUserLocation().then(res => {
      this.fetchWeather(res[0].city, res[0].isoCountryCode).then(forecast => {
        this.setState({
          city: res[0].city,
          temperature: forecast.main.temp,
          periodOfDay: this.getPeriodOfDay(),
          weatherCondition: forecast.weather[0].main,
          isLoading: false
        });
      });
    })
    .catch(err => {alert("Error!", err)});
  }

  // gets the appropriate phrase based on temperature
  getWeatherPhrase() {
    const { temperature } = this.state;

    if(temperature < 0) {
      return "Stay inside. It really really isn’t worth it today!";
    }
    // 0 - 10 celsius
    if(temperature >= 0 && temperature <= 10) {
      return "Put on a lot layers and you might be okay... Might!";
    }
    // 11 - 20 celsius. 10 is still too cold to go outside and do stuff.
    if(temperature > 10 && temperature <= 20) {
      return "Shouldn’t you be outside and do stuff right now?";
    }

    if(temperature > 20) {
      return "It’s gettin’ hot in here... Burn burn burn... and so on";
    }
  }

  // get forecast data from open weather map API
  fetchWeather(city, country) {
    return fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${API_KEY}`
    )
      .then(res => { return res.json() })
      .catch(() => {
        alert("Couldn't fetch weather, try again later")
      });
  }

  // return whether it is night or day
  getPeriodOfDay() {
    const {sunrise, sunset} = this.state;
    const currentUnixTimestamp = parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0));

    if(currentUnixTimestamp < sunrise && currentUnixTimestamp > sunset) return 'night'
    return 'day';
  }

  render() {
    const { isLoading, temperature, city, periodOfDay, weatherCondition } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? 
          <View style={styles.loader}>
              <ActivityIndicator size="large" color="#F5C022" />
          </View>
        : (
          <Fragment>
            <WeatherHeader periodOfDay={periodOfDay} temperature={temperature} city={city} weatherCondition={weatherCondition} />
            <WeatherBody periodOfDay={periodOfDay} phrase={this.getWeatherPhrase()} />
          </Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
