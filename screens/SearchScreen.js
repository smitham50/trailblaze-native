import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import TrailSearchButton from '../components/TrailSearchButton';
import Trails from '../components/Trails';
import { HIKING_PROJECT_KEY } from '@env';
import { validateTrail } from '../utils/validateTrail';
import * as Location from 'expo-location';
import axios from 'axios';

export default function SearchScreen(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [trails, setTrails] = useState(null);

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
      const searchResults = await axios.get(queryURL);
      setTrails(searchResults.data.trails.filter(trail => validateTrail(trail)));
    }
  }

  console.log(location, trails);

  return (
    <View style={styles.container}>
      {location && !trails && <TrailSearchButton searchTrails={searchTrails} />}
      {!location && !trails && <ActivityIndicator size="large" color="#2a7677" />}
      {trails && <Trails trails={trails} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
