import React from 'react';
import { Image, Text, View } from 'react-native';

export default function Trail(props) {
  return (
    <View>
      <Text>{props.trail.name}</Text>
    </View>
  )
}
