import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import TrailSearchButton from '../components/TrailSearchButton';
import { HIKING_PROJECT_KEY } from '@env';
import { validateTrail } from '../utils/validateTrail';
import * as Location from 'expo-location';
import axios from 'axios';
import { connect } from 'react-redux';

function SearchScreen(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { setTrails } = props;

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

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const searchTrails = async () => {
    if (location) {
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const queryURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=150&maxResults=50&key=${HIKING_PROJECT_KEY}`;
      try {
        const searchResults = await axios.get(queryURL);
        setTrails(searchResults.data.trails.filter(trail => validateTrail(trail)));
        props.navigation.navigate('Search Results');
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <View style={styles.container}>
      {location && <TrailSearchButton searchTrails={searchTrails} />}
      {!location && <ActivityIndicator size="large" color="#2a7677" />}
    </View>
  );
}

function mdp(dispatch) {
  return {
    setTrails: (trails) => {
      dispatch({
        type: "SET_TRAILS",
        payload: trails
      })
    }
  }
}

export default connect(null, mdp)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
