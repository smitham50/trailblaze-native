import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import TrailSearchButton from './components/TrailSearchButton';
import { HIKING_PROJECT_KEY } from '@env';
import axios from 'axios';

export default function App() {
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

  useEffect(() => {
    if (location) {
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      (async () => {
        const queryURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=150&maxResults=300&key=${HIKING_PROJECT_KEY}`;
        const searchResults = await axios.get(queryURL);
        setTrails(searchResults);
        console.log(trails);
      })();
      
    }
    
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View >
        {location && <TrailSearchButton />}
        {!location && <ActivityIndicator size="large" color="#2a7677"/>}
        <Text>{location && `${location.coords.longitude}, ${location.coords.latitude}`}</Text>
        <Text>{location && `${HIKING_PROJECT_KEY}`}</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
