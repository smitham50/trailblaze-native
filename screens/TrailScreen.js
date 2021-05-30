import React from 'react';
import { StyleSheet, View } from "react-native";
import Trail from '../components/Trail';
import MapView from 'react-native-maps';


export default function TrailScreen() {
  return (
    <View style={styles.page}>
      <Trail />
      <View style={styles.mapContainer}>
        <MapView 
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mapContainer: {
    height: 400,
    width: 400
  },
  map: {
    flex: 1
  }
});


