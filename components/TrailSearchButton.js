import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TrailSearchButton(props) {
  const { buttonText, button } = styles;
  const { searchTrails } = props;

  const handlePress = () => searchTrails();

  return (
    <TouchableOpacity onPress={handlePress} style={button}>
      <Text style={buttonText}>Search Trails</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ffffffcf',
    borderRadius: 20,
    padding: 20,
    paddingTop: 38,
    marginBottom: 20,
    width: 300,
    height: 100,
    backgroundColor: '#37373842'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  }
});