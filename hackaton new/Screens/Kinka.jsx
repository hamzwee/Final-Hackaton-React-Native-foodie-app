
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { ArrowLeft, Heart, Star, ChevronRight, Plus } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [orderType, setOrderType] = useState('Delivery');
  const [activeTab, setActiveTab] = useState('Featured Items');

  const menuItems = {
    'Featured Items': [
      { id: 1, name: 'Udon Miso', description: 'Thick handmade udon noodles in a rich miso broth...', price: '$16.00', image: require('../assets/Image.png') },
      { id: 2, name: 'Tempura Platter', description: 'Assorted tempura with dipping sauce...', price: '$14.00', image: require('../assets/tempura.jpg') }
    ],
    'Appetizers': [
      { id: 3, name: 'Gyoza', description: 'Pan-fried dumplings filled with pork and veggies...', price: '$8.00', image: require('../assets/gyoza.jpg') },
      { id: 4, name: 'Edamame', description: 'Lightly salted steamed soybeans...', price: '$5.00', image: require('../assets/Image.png') }
    ],
    'Sushi': [
      { id: 5, name: 'Salmon Nigiri', description: 'Fresh salmon over rice...', price: '$10.00', image: require('../assets/salmonnigiri.jpg') },
      { id: 6, name: 'Tuna Roll', description: 'Seaweed roll filled with tuna and rice...', price: '$12.00', image: require('../assets/tuna.jpg') }
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.heroContainer}>
          <Image source={require('../assets/restaurant1.png')} style={styles.heroImage} />
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <ArrowLeft stroke="white" width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setLiked(!liked)}>
              <Heart stroke={liked ? 'white' : '#666'} width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.restaurantInfo}>
          <View style={styles.nameContainer}>
            <View style={styles.ratingBadge}>
              <Star fill="white" stroke="white" width={16} height={16} />
            </View>
            <Text style={styles.restaurantName}>Kinka Izakaya</Text>
          </View>
          <TouchableOpacity style={styles.addressContainer}>
            <Text style={styles.addressText}>2972 Westheimer Rd. Santa Ana</Text>
            <ChevronRight stroke="#666" width={20} height={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.orderTypesContainer}>
          {['Delivery', 'Take Out', 'Group'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.orderTypeButton, orderType === type && styles.activeOrderType]}
              onPress={() => setOrderType(type)}
            >
              <Text style={orderType === type ? styles.activeOrderTypeText : styles.orderTypeText}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuNav}>
          {Object.keys(menuItems).map((tab) => (
            <Text
              key={tab}
              style={[styles.menuNavItem, activeTab === tab && styles.activeMenuNavItem]}
              onPress={() => setActiveTab(tab)}
            >
              {tab}
            </Text>
          ))}
        </ScrollView>

        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>{activeTab}</Text>
          {menuItems[activeTab].map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem} 
              onPress={() => navigation.navigate('Menu', { item })}
            >
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                <Text style={styles.menuItemPrice}>{item.price}</Text>
              </View>
              <View style={styles.menuItemImageContainer}>
                <Image source={item.image} style={styles.menuItemImage} />
              
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#15113B',
      },
      heroContainer: {
        height: 300,
        position: 'relative',
      },
      heroImage: {
        width: '100%',
        height: '100%',
      },
      headerButtons: {
        position: 'absolute',
        top: StatusBar.currentHeight || 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
      },
      iconButton: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      restaurantInfo: {
        padding: 16,
      },
      nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      ratingBadge: {
        width: 32,
        height: 32,
        backgroundColor: '#000',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      },
      restaurantName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
      addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      addressText: {
        color: '#666',
        fontSize: 16,
        flex: 1,
      },
      deliveryFeesContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginHorizontal: 16,
        borderRadius: 12,
      },
      feeItem: {
        flex: 1,
        alignItems: 'center',
      },
      feeLabel: {
        color: '#666',
        fontSize: 14,
        marginBottom: 4,
      },
      feeAmount: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      orderTypesContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 8,
        flexWrap: 'wrap'
      },
      orderTypeButton: {
        flex: 1,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
      },
      activeOrderType: {
        backgroundColor: '#2563eb',
      },
      orderTypeText: {
        color: 'white',
        fontSize: 16,
      },
      activeOrderTypeText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      menuNav: {
        paddingHorizontal: 16,
      },
      menuNavItem: {
        color: '#666',
        fontSize: 16,
        marginRight: 24,
        paddingVertical: 8,
        paddingHorizontal: 16, 
      },
      activeMenuNavItem: {
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: '#2563eb',
      },
      featuredContainer: {
        padding: 16,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
      },
      menuItem: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
      },
      menuItemInfo: {
        flex: 1,
      },
      menuItemName: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
      },
      menuItemDescription: {
        color: '#666',
        fontSize: 14,
        marginVertical: 8,
      },
      menuItemPrice: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      menuItemImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuItemImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
      },
      addButton: {
        marginTop: 8,
        backgroundColor: '#2563eb',
        padding: 8,
        borderRadius: 12,
      },
    });
