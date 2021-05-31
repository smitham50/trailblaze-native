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
      <Text style={styles.text}>Rating: {props.trail.stars} from {props.trail.starVotes} users</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 5,
    right: 0,
    bottom: 0,
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    margin: 5,
    fontSize: 18
  }
})

export default TrailInfo;
