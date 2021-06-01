import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrailInfo from './TrailInfo';

export default function Trail(props) {
  const [showTrailInfo, setShowTrailInfo] = useState(false);
  const navigation = useNavigation();

  const routeToTrailScreen = () => {
    navigation.navigate('Trail', { trail: props.trail });
  }

  const toggleShowTrailInfo = () => {
    setShowTrailInfo(!showTrailInfo);
  }

  return (
    <TouchableOpacity onPress={props.route ? toggleShowTrailInfo : routeToTrailScreen}>
      <ImageBackground 
        style={styles.image} 
        source={{uri: props.trail?.imgMedium}}
      >
        {
          showTrailInfo
          ? <TrailInfo trail={props.trail}/>
          : <View style={styles.overlay}>
              <Text style={styles.text}>{props.trail?.name}</Text>
              <Text style={styles.text}>{props.trail?.location}</Text>
              <Text style={{...styles.text, ...styles.info}}>Tap image for info</Text>
            </View>
        }
        
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    margin: 5
  },
  overlay: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    color: 'white',
    margin: 5,
    fontSize: 18
  },
  info: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    fontSize: 12
  }
});
