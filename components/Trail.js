import React from 'react';
import { ImageBackground, Text, View, StyleSheet } from 'react-native';

export default function Trail(props) {
  return (
    <View>
      <ImageBackground style={styles.image} source={{uri: props.trail.imgMedium}}>
        <View style={styles.overlay}>
          <Text style={styles.text}>{props.trail.name}</Text>
          <Text style={styles.text}>{props.trail.location}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    marginTop: 5,
    marginBottom: 5
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
    fontSize: 20
  }
});
