import React from 'react';
import { ScrollView } from 'react-native';
import Trail from './Trail';

export default function Trails(props) {
  const renderTrails = () => {
    return props.trails.map(trail => {
      console.log(trail);
      return <Trail key={trail.id} trail={trail}/>
    });
  }

  return (
    <ScrollView>
      { renderTrails() }
    </ScrollView>
  );
}
