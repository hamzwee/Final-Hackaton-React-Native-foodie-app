import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const SeeAll = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>See All Categories</Text>
      <ScrollView style={styles.categoryList}>
        <View style={styles.categoryItem}>
          <Image
            source={require('../assets/burger1.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Burgers</Text>
        </View>
        <View style={styles.categoryItem}>
          <Image
            source={require('../assets/cake1.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Dessert</Text>
        </View>
        <View style={styles.categoryItem}>
          <Image
            source={require('../assets/taco1.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Mexican</Text>
        </View>
        <View style={styles.categoryItem}>
          <Image
            source={require('../assets/sushi.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Sushi</Text>
        </View>
        <View style={styles.categoryItem}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxM0mhbBpSwzTsI-pU-BbBEGa5GABC1ahiw&s' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Pizza</Text>
        </View>
        <View style={styles.categoryItem}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFhqU_qLa7seFJ51qhVmX33kcwBKCw4lwP9w&s' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Pasta</Text>
        </View>
        <View style={styles.categoryItem}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpnqAkhhJkq73mWYmIlb--uUgYuofwbY4kWw&s' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Salads</Text>
        </View>
        <View style={styles.categoryItem}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/768/768181.png' }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Smoothies</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15113B', 
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryList: {
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20, 
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D102D', 
  },
  goBackText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

export default SeeAll;