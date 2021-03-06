import React from 'react';
import { ScrollView } from 'react-native';
import Trail from './Trail';
import { connect } from 'react-redux';

function Trails(props) {
  const renderTrails = () => {
    return props.displayedTrails.map(trail => {
      return <Trail key={trail.id} trail={trail} />
    });
  }

  return (
    <ScrollView>
      { renderTrails() }
    </ScrollView>
  );
}

function msp(state) {
  const { displayedTrails } = state.trail;

  return { displayedTrails };
}

export default connect(msp, null)(Trails);
