import React from 'react';
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Trail from '../components/Trail';
import { MAPBOX_KEY } from '@env';

MapboxGL.setAccessToken(MAPBOX_KEY);

export default function TrailScreen() {
  return (
    <View style={styles.page}>
      <Trail />
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
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
  container: {
    height: 400,
    width: 400
  },
  map: {
    flex: 1
  }
});


