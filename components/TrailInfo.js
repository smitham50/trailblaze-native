import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrailInfo = (props) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.text}>{props.trail.summary}</Text>
      <Text style={styles.text}>Length: {props.trail.length} miles</Text>
      <Text style={styles.text}>Difficulty: {props.trail.difficulty}</Text>
      <Text style={styles.text}>Ascent: {props.trail.ascent}</Text>
      <Text style={styles.text}>Descent: {props.trail.descent}</Text>
      <Text style={styles.text}>Rating: {props.trail.stars} stars from {props.trail.starVotes} users</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: '#0000002e'
  },
  text: {
    color: 'white',
    margin: 5,
    fontSize: 18
  }
})

export default TrailInfo;
