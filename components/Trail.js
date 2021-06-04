import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TrailInfo from './TrailInfo';
import { 
  ImageBackground, 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  Dimensions 
} from 'react-native';

export default function Trail(props) {
  const [showTrailInfo, setShowTrailInfo] = useState(false);
  const navigation = useNavigation();

  const { trail, route } = props;
  const { overlay, text, info, image } = styles;

  const routeToTrailScreen = () => {
    navigation.navigate('Trail', { trail: trail });
  }

  const toggleShowTrailInfo = () => {
    setShowTrailInfo(!showTrailInfo);
  }

  return (
    <TouchableOpacity onPress={route ? toggleShowTrailInfo : routeToTrailScreen}>
      <ImageBackground 
        style={image} 
        source={{uri: trail?.imgMedium}}
      >
        {
          showTrailInfo
          ? <TrailInfo trail={trail}/>
          : <View style={overlay}>
              <Text style={text}>{trail?.name}</Text>
              <Text style={text}>{trail?.location}</Text>
              {route && <Text style={{...text, ...info}}>Tap image for info</Text>}
            </View>
        }
      </ImageBackground>
    </TouchableOpacity>
  )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: width * .98,
    height: height * .45,
    margin: 4
  },
  overlay: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    color: 'white',
    margin: 5,
    fontSize: 18
  },
  info: {
    position: 'absolute',
    top: 365,
    left: 10,
    right: 0,
    bottom: 0,
    fontSize: 10
  }
});
