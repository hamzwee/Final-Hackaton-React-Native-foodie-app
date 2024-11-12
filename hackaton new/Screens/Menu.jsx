import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ArrowLeft, Heart, Minus, Plus } from 'react-native-feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [liked, setLiked] = useState(false);
  const [cartMessageVisible, setCartMessageVisible] = useState(false);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const toggleLike = () => setLiked(prevLiked => !prevLiked);

  const handleAddToCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      let cartArray = cartData ? JSON.parse(cartData) : [];

      const existingItemIndex = cartArray.findIndex(
        cartItem => cartItem.id === item.id && cartItem.type === selectedType
      );

      if (existingItemIndex >= 0) {
        cartArray[existingItemIndex].quantity += quantity;
      } else {
        cartArray.push({ ...item, quantity, type: selectedType });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cartArray));
    } catch (error) {
      console.error('Error saving to AsyncStorage', error);
    }

    setCartMessageVisible(true);
    setQuantity(1);
  };

  const closeCartMessage = () => {
    setCartMessageVisible(false);
  };

  const goToCart = () => {
    navigation.navigate('Cart');
    setCartMessageVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <ArrowLeft stroke="white" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLike} style={styles.iconButton}>
          <Heart stroke={liked ? 'white' : 'grey'} width={24} height={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={item.image} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
              <Minus stroke="white" width={20} height={20} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
              <Plus stroke="white" width={20} height={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Type</Text>
              <View style={styles.requiredBadge}>
                <Text style={styles.requiredText}>Required</Text>
              </View>
            </View>
            {['Half', 'Full'].map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.optionItem}
                onPress={() => setSelectedType(type)}
              >
                <Text style={styles.optionText}>{type}</Text>
                <View
                  style={[styles.radioButton, selectedType === type && styles.radioButtonSelected]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.addButton, !selectedType && styles.addButtonDisabled]}
            disabled={!selectedType}
            onPress={handleAddToCart}
          >
            <Text style={styles.addButtonText}>Add to Basket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {cartMessageVisible && (
        <View style={styles.cartMessageContainer}>
          <Text style={styles.cartMessageText}>
            Item added to cart
          </Text>
          <View style={styles.cartMessageButtons}>
            <TouchableOpacity onPress={goToCart} style={styles.cartButton}>
              <Text style={styles.cartButtonText}>View Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeCartMessage} style={styles.cartButton}>
              <Text style={styles.cartButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
        flex: 1,
        backgroundColor: '#15113B',
      },
      header: {
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
      image: {
        width: '100%',
        height: 200,
      },
      scrollContent: {
        paddingBottom: 20,
      },
      content: {
        flex: 1,
        padding: 20,
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
      },
      price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 10,
      },
      description: {
        fontSize: 16,
        color: '#9ca3af',
        marginBottom: 20,
      },
      quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 25,
        padding: 4,
        marginBottom: 32,
        width: 160,
      },
      quantityButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
      quantityText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 16,
      },
      optionsContainer: {
        width: '100%',
        marginBottom: 32,
      },
      optionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      },
      optionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      requiredBadge: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
      },
      requiredText: {
        color: '#9ca3af',
        fontSize: 14,
      },
      optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
      },
      optionText: {
        color: 'white',
        fontSize: 16,
      },
      radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4b5563',
      },
      radioButtonSelected: {
        borderColor: '#2563eb',
        backgroundColor: '#2563eb',
      },
      addButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 20,
      },
      addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      addButtonDisabled: {
        backgroundColor: '#9ca3af',
      },
      cartMessageContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2e2e2e',
        padding: 16,
        borderTopWidth: 2,
        borderTopColor: '#3b3b3b',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      cartMessageText: {
        color: 'white',
        fontSize: 16,
      },
      cartMessageButtons: {
        flexDirection: 'row',
      },
      cartButton: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginLeft: 10,
      },
      cartButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
      },
});