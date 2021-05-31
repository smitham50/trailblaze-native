import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Trail(props) {
  const navigation = useNavigation();

  const routeToTrailScreen = () => {
    navigation.navigate('Trail', { trail: props.trail });
  }

  return (
    <TouchableOpacity onPress={routeToTrailScreen}>
      <ImageBackground 
        style={styles.image} 
        source={{uri: props.trail?.imgMedium}}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{props.trail?.name}</Text>
          <Text style={styles.text}>{props.trail?.location}</Text>
        </View>
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
  }
});
