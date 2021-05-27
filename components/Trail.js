import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    marginTop: 5,
    marginBottom: 5
  }
})

export default function Trail(props) {
  return (
    <View>
      <Image style={styles.image} source={{uri: props.trail.imgMedium}}/>
    </View>
  )
}
