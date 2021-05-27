import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TrailSearchButton(props) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Search Trails</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    padding: 20,
    paddingTop: 38,
    color: 'gray',
    width: 300,
    height: 100,

  },
  buttonText: {
    textAlign: 'center',
    color: 'black',

  }
});