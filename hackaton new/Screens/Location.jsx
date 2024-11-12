import React, { useState } from 'react';
import { ArrowLeft } from 'react-native-feather';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMapPress = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    setSelectedLocation({ x: locationX, y: locationY });
  };

  const handleSetLocation = () => {
    console.log('Location set to:', selectedLocation);
    navigation.navigate('Order');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <ArrowLeft stroke="white" width={24} height={24} />
      </TouchableOpacity>

      <Text style={styles.heading}>Find Location</Text>

      <TouchableOpacity onPress={handleMapPress} style={styles.mapContainer}>
        <Image
          source={{ uri: 'https://staticmapmaker.com/img/google-placeholder.png' }}
          style={styles.map}
        />
        {selectedLocation && (
          <View
            style={[
              styles.marker,
              {
                left: selectedLocation.x - 15,
                top: selectedLocation.y - 30,
              },
            ]}
          />
        )}
      </TouchableOpacity>

      <View style={styles.locationDisplay}>
        <Text style={styles.locationTextLabel}>Your Location</Text>
        <Text style={styles.locationText}>
          {selectedLocation
            ? `X: ${selectedLocation.x.toFixed(2)}, Y: ${selectedLocation.y.toFixed(2)}`
            : 'Manchester, Kentucky 39495'}
        </Text>
      </View>

      {selectedLocation && (
        <TouchableOpacity style={styles.setLocationButton} onPress={handleSetLocation}>
          <Text style={styles.setLocationButtonText}>Set Location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#15113B', 
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  mapContainer: {
    width: '100%',
    height: 250,
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#3A3A58', 
  },
  map: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  marker: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  locationDisplay: {
    backgroundColor: '#2A245F',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  locationTextLabel: {
    fontSize: 16,
    color: '#A1A1A1',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  setLocationButton: {
    backgroundColor: '#3944F7', 
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  setLocationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Location;