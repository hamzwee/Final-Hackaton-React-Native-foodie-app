import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import MenuDetailScreen from './Menu';

const Home = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const navigateToSeeAll = () => {
    navigation.navigate('SeeAll');
  };

  const images = {
    burger: require('../assets/burger1.png'),
    cake: require('../assets/cake1.png'),
    taco: require('../assets/taco1.png'),
    sushi: require('../assets/sushi.png'),
  };

  const navigateToOrder = (item) => {
    navigation.navigate('Order', { item });
  };

  const navigateToKinka = () => {
    navigation.navigate('Kinka');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topLeft}>
          <TouchableOpacity>
            <Icon name="menu" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryText}>Delivery</Text>
            <Text style={styles.suitesText}>Maplewood Suites</Text>
          </View>
        </View>

        <View style={styles.topRight}>
          <TouchableOpacity onPress={handleToggle}>
            <Icon name={isToggled ? 'walk' : 'bicycle'} size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Icon name="search" size={20} color="white" style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Your order?"
            placeholderTextColor="white"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesText}>Categories</Text>
          <TouchableOpacity onPress={navigateToSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryBoxesContainer}>
          <View style={styles.categoryBox}>
            <Image source={require('../assets/burger1.png')} style={styles.categoryImage} />
            <Text style={styles.categoryName}>Burgers</Text>
          </View>
          <View style={styles.categoryBox}>
            <Image source={require('../assets/cake1.png')} style={styles.categoryImage} />
            <Text style={styles.categoryName}>Dessert</Text>
          </View>
          <View style={styles.categoryBox}>
            <Image source={require('../assets/taco1.png')} style={styles.categoryImage} />
            <Text style={styles.categoryName}>Mexican</Text>
          </View>
          <View style={styles.categoryBox}>
            <Image source={require('../assets/sushi.png')} style={styles.categoryImage} />
            <Text style={styles.categoryName}>Sushi</Text>
          </View>
        </View>

        <View style={styles.foodBoxesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['burger', 'cake', 'taco', 'sushi'].map((type, index) => (
              <View key={index} style={styles.foodBox}>
                <View style={styles.foodBoxTextContainer}>
                  <Text style={styles.discountText}>30% Off</Text>
                  <Text style={styles.subText}>Discover discounts at your favorite restaurant</Text>
                  
                </View>
                <Image source={images[type]} style={styles.foodBoxImage} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.fastestContainer}>
          <Text style={styles.fastestTitle}>Fastest near you</Text>
          <TouchableOpacity onPress={navigateToKinka}>
            <View style={styles.fastestCard}>
              <ImageBackground source={require('../assets/restaurant1.png')} style={styles.fastestImageBackground} imageStyle={{ borderRadius: 10 }}>
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
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15113B',
    padding: 20,
  },
  topLeft: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryInfo: {
    marginLeft: 10,
  },
  deliveryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suitesText: {
    color: 'white',
    fontSize: 16,
  },
  topRight: {
    position: 'absolute',
    top: 40,
    right: 20,
    alignItems: 'flex-end',
  },
  searchContainer: {
    position: 'absolute',
    top: 120,
    left: '10%',
    right: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#1D102D',
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },
  searchIcon: {
    marginLeft: 10,
  },
  categoriesContainer: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriesText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  categoryBoxesContainer: {
    position: 'absolute',
    top: 240,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryBox: {
    backgroundColor: '#1D102D',
    width: '23%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
    borderRadius: 5,
  },
  categoryName: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  foodBoxesContainer: {
    marginTop: 350,
  },
  foodBox: {
    flexDirection: 'row-reverse',
    backgroundColor: '#1D102D',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
    width: 280,
    height: 150,
  },
  foodBoxImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginLeft: 15,
  },
  foodBoxTextContainer: {
    flex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: 'white',
    fontSize: 12,
    marginVertical: 5,
  },
  orderButton: {
    backgroundColor: '#252866',
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fastestContainer: {
    marginTop: 20,
    padding: 10,
  },
  fastestTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
});

export default Home;