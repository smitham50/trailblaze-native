import React from 'react';
import { StyleSheet, View } from "react-native";
import Trail from '../components/Trail';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';


function TrailScreen(props) {
  const trail = props.route.params.trail;

  return (
    <View style={styles.page}>
      <Trail trail={trail} />
      <View style={styles.mapContainer}>
        <MapView 
          initialRegion={{
            latitude: trail.latitude,
            longitude: trail.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={styles.map}
        />
      </View>
    </View>
  );
}

export default connect(null, null)(TrailScreen);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mapContainer: {
    height: 400,
    width: 400,
    margin: 5
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  }
});


