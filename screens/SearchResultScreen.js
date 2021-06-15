import React from 'react';
import { View, StyleSheet } from 'react-native';
import Trails from '../components/Trails';

const SearchResultScreen = () => {
  return (
    <View style={styles.trailsContainer}>
      <Trails />
    </View>
  );
}

const styles = StyleSheet.create({
  trailsContainer: {
    alignItems: "center",
  },
});



export default SearchResultScreen;
