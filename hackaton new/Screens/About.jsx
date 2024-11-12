import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { Navigation } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const About = () => {
  const Navigation = useNavigation();

  const navigateToKinka = () => {
    Navigation.navigate('Kinka');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToKinka}>
        <View style={styles.fastestCard}>
          <ImageBackground source={require('../assets/restaurant1.png')}
            style={styles.fastestImageBackground} imageStyle={{ borderRadius: 10 }}>
            <View style={styles.fastestInfo}>
              <Text style={styles.restaurantName}>Kinka Izakaya</Text>
              <Text style={styles.restaurantType}>Japanese</Text>
              <Text style={styles.deliveryInfoText}>$3.99 delivery fee • 30 min</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.7</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15113B',
    padding: 20,
  },
  fastestCard: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  fastestImageBackground: {
    height: 150,
    justifyContent: 'space-between',
    padding: 10,
  },
  fastestInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  restaurantName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantType: {
    color: 'white',
    fontSize: 14,
  },
  deliveryInfoText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#252866',
    borderRadius: 5,
    padding: 5,
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
  },
})
export default About