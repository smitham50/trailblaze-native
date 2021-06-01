import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking } from "react-native";
import Trail from '../components/Trail';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { GOOGLE_DIRECTIONS_API_KEY} from '@env';
import MapViewDirections from 'react-native-maps-directions';

function TrailScreen(props) {
  const trail = props.route.params.trail;
  const { location } = props;
  const { page, mapContainer, map, mapButton, text } = styles;
  const coords = { 
    latitude: location.coords.latitude, 
    longitude: location.coords.longitude 
  };
  
  const openInMaps = () => {
    Linking.openURL(`maps://app?saddr=${coords.latitude}+${coords.longitude}&daddr=${trail.latitude}+${trail.longitude}`);
  }

  return (
    <View style={page}>
      <Trail trail={trail} route={props.route}/>
      <View style={mapContainer}>
        <MapView 
          initialRegion={{
            latitude: trail.latitude,
            longitude: trail.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={map}
        >
          <Marker
            key={trail.id}
            coordinate={{ latitude: trail.latitude, longitude: trail.longitude }}
            title={trail.name}
            description={trail.description}
          />
          <Marker
            key={location.coords.latitude}
            coordinate={ coords }
            title={'You are here'}
          />
          <MapViewDirections 
            origin={ coords }
            destination={{ latitude: trail.latitude, longitude: trail.longitude }}
            apikey={ GOOGLE_DIRECTIONS_API_KEY }
            strokeWidth={3}
            strokeColor="hotpink"
          />
          <TouchableOpacity style={mapButton} onPress={openInMaps}>
            <Text style={text}>Open in Maps</Text>
          </TouchableOpacity>
        </MapView>
      </View>
    </View>
  );
}

function msp(state) {
  const { location } = state.user;

  return { location };
}

export default connect(msp, null)(TrailScreen);

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
    ...StyleSheet.absoluteFillObject
  },
  mapButton: {
    position: 'absolute',
    top: 8,
    left: 16,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  text: {
    color: 'white',
    top: 8,
    left: 16,
    fontSize: 18
  }
});


