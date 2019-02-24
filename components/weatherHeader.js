import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { colorThemes } from '../utils/colorThemes';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class WeatherHeader extends React.Component {
  render() {
    const { city, temperature, periodOfDay, icon } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: colorThemes[periodOfDay].headerBackground }]}>
        <View style={styles.cityTextWrapper}>
          <Text style={[styles.cityText, { color: colorThemes[periodOfDay].fontColor }]}>{city}</Text>
        </View>
        <View style={styles.dataWrapper}>
          <MaterialCommunityIcons size={80} color={ colorThemes[periodOfDay].fontColor } name={'weather-cloudy'} />
          <Text style={[styles.tempText, { color: colorThemes[periodOfDay].fontColor }]}>{temperature}˚</Text>
        </View>
      </View>
    );
  }
}

WeatherHeader.propTypes = {
  temperature: PropTypes.number,
  city: PropTypes.string,
  periodOfDay: PropTypes.string,
  icon: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cityTextWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityText: {
    fontSize: 22,
    top: 25,
    alignItems: 'center',
    fontFamily: 'raleway-semi'
  },
  tempText: {
    fontSize: 40,
    fontFamily: 'raleway-light'
  },
  icon: {
    fontSize: 80,
  },
  dataWrapper: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 10
  }
});
