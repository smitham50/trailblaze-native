import React, {useState, useEffect} from 'react';
import { 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  ImageBackground, 
  Text
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import TrailSearchButton from '../components/TrailSearchButton';
import { HIKING_PROJECT_KEY } from '@env';
import { validateTrail } from '../utils/validateTrail';
import * as Location from 'expo-location';
import axios from 'axios';
import { connect } from 'react-redux';

function SearchScreen(props) {
  const [errorMsg, setErrorMsg] = useState(null);
  const { setTrails, setLocation, location } = props;
  const { container, image, labelText, searchView } = styles;
  const [ distanceToTravel, setDistanceToTravel ] = useState(100);

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
      const queryURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=${distanceToTravel}&maxResults=100&key=${HIKING_PROJECT_KEY}`;
      try {
        const searchResults = await axios.get(queryURL);
        setTrails(searchResults.data.trails.filter(trail => validateTrail(trail)));
        props.navigation.navigate('Search Results');
      } catch (e) {
        setErrorMsg(e);
      }
    }
  }

  const placeholder = {
    label: '100 miles',
    value: 100,
    color: '#3c3d4ae0',
  };

  return (
    <View style={container}>
      <ImageBackground style={image} source={require('../assets/images/trail.jpg')}>
        {
          location && 
          <View style={searchView}>
            <Text style={labelText}>How far would you like to travel?</Text>
            <RNPickerSelect
              onValueChange={(value) => setDistanceToTravel(value)}
              value={distanceToTravel}
              placeHolder={placeholder}
              style={pickerStyle}
              items={[
                { label: '15 miles', value: 15 },
                { label: '30 miles', value: 30 },
                { label: '60 miles', value: 60 },
                { label: '100 miles', value: 100 },
                { label: '150 miles', value: 150 },
                { label: '200 miles', value: 200 },
                { label: '250 miles', value: 250 }
              ]}
            />
            <TrailSearchButton searchTrails={searchTrails} />
          </View>
        }
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
  },
  labelText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10
  },
  searchView: {
    borderRadius: 20,
    backgroundColor: '#37373842',
    padding: 20
  }
});

const pickerStyle = {
  inputIOS: {
    color: 'white',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    textAlign: 'center',
    fontSize: 18,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ffffffcf',
    borderRadius: 20,
    marginBottom: 20
  },
  inputAndroid: {
    color: 'white',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    textAlign: 'center',
    fontSize: 18,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ffffffcf',
    borderRadius: 20,
    marginBottom: 20
  },
  placeholderColor: 'white',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};
