import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { colorThemes } from '../utils/colorThemes';

export default class WeatherBody extends React.Component {
  render() {
    const { phrase, periodOfDay} = this.props;

    return (
      <View style={[styles.container, { backgroundColor: colorThemes[periodOfDay].bodyBackground }]}>
        <View style={styles.dayWrapper} >
          <Text style={[styles.dayText, { color: colorThemes[periodOfDay].fontColor }]}>today</Text>
        </View>
        <Text style={[styles.phrase, { color: colorThemes[periodOfDay].fontColor }]}>{phrase}</Text>
      </View>
    );
  }
}

WeatherBody.propTypes = {
  phrase: PropTypes.string,
  periodOfDay: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 2.5,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: 'flex-start',
    overflow: 'scroll'
  },
  phrase: {
    flex: 6,
    fontSize: 55,
    fontFamily: 'raleway',
    marginTop: 10
  },
  dayText: {
    fontFamily: 'raleway',
    fontSize: 22,
    fontWeight: 'bold',
  },
  dayWrapper: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
  }
});
