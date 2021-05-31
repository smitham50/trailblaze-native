import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TrailSearchButton(props) {
  const handlePress = () => props.searchTrails();

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.buttonText}>Search Trails</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    padding: 20,
    paddingTop: 38,
    width: 300,
    height: 100
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
});