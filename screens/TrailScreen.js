import React, { useRef } from 'react';
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

  const mapRef = useRef(null);

  const latLongs = [
    { latitude: coords.latitude, longitude: coords.longitude },
    { latitude: trail.latitude, longitude: trail.longitude }
  ];
  
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
            latitudeDelta: 0.015, 
            longitudeDelta: 0.0121
          }}
          style={map}
          ref={mapRef}
          onLayout={() => mapRef?.current.fitToCoordinates(latLongs, { edgePadding: { top: 35, right: 35, bottom: 35, left: 35 }, animated: false })}
        >
          <Marker
            key={trail.id}
            coordinate={{ latitude: trail.latitude, longitude: trail.longitude }}
            title={trail.name}
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
    paddingHorizontal: 15,
    backgroundColor: '#a7a7a70f'
  },
  text: {
    color: 'white',
    top: 8,
    left: 16,
    fontSize: 18
  }
});


