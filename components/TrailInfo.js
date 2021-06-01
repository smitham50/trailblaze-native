import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrailInfo = (props) => {
  const { text, overlay } = styles;
  const { 
    summary,
    length,
    difficulty,
    ascent,
    descent,
    stars,
    starVotes
  } = props.trail;

  return (
    <View style={overlay}>
      <Text style={text}>{summary}</Text>
      <Text style={text}>Length: {length} miles</Text>
      <Text style={text}>Difficulty: {difficulty}</Text>
      <Text style={text}>Ascent: {ascent}</Text>
      <Text style={text}>Descent: {descent}</Text>
      <Text style={text}>Rating: {stars} stars from {starVotes} users</Text>
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
