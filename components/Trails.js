import React from 'react';
import { ScrollView } from 'react-native';
import Trail from './Trail';
import { connect } from 'react-redux';

function Trails(props) {
  const renderTrails = () => {
    return props.trails.map(trail => {
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
  const { trails } = state.trail;

  return { trails };
}

export default connect(msp, null)(Trails);
