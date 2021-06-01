import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet, ImageBackground, Text } from 'react-native';
import TrailSearchButton from '../components/TrailSearchButton';
import { HIKING_PROJECT_KEY } from '@env';
import { validateTrail } from '../utils/validateTrail';
import * as Location from 'expo-location';
import axios from 'axios';
import { connect } from 'react-redux';

function SearchScreen(props) {
  const [errorMsg, setErrorMsg] = useState(null);
  const { setTrails, setLocation, location } = props;
  const { container, image } = styles;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const searchTrails = async () => {
    if (location) {
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const queryURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=150&maxResults=100&key=${HIKING_PROJECT_KEY}`;
      try {
        const searchResults = await axios.get(queryURL);
        setTrails(searchResults.data.trails.filter(trail => validateTrail(trail)));
        props.navigation.navigate('Search Results');
      } catch (e) {
        setErrorMsg(e);
      }
    }
  }

  return (
    <View style={container}>
      <ImageBackground style={image} source={require('../assets/images/trail.jpg')}>
        {location && <TrailSearchButton searchTrails={searchTrails} />}
        {!location && <ActivityIndicator size="large" color="white" />}
        {errorMsg && <Text>{errorMsg}</Text>}
      </ImageBackground>
    </View>
  );
}

function msp(state) {
  const {
    location
  } = state.user;

  return {
    location
  }
}

function mdp(dispatch) {
  return {
    setTrails: (trails) => {
      dispatch({
        type: "SET_TRAILS",
        payload: trails
      });
    },
    setLocation: (location) => {
      dispatch({
        type: "SET_LOCATION",
        payload: location
      });
    }
  }
}

export default connect(msp, mdp)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
  }
});
