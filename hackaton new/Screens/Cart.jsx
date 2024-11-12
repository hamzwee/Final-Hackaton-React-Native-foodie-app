import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Cart({ navigation }) {
  const [cart, setCart] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadCart = async () => {
        try {
          const savedCart = await AsyncStorage.getItem('cart');
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            setCart(parsedCart);
          }
        } catch (error) {
          console.error('Failed to load cart data', error);
        }
      };
      loadCart();
    }, [])
  );

  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
  const removeItem = async (index) => {
    const updatedCart = cart.filter((_, itemIndex) => itemIndex !== index);
    setCart(updatedCart);
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Failed to update cart in AsyncStorage', error);
    }
  };
  

  const calculateSubtotal = () => {
    let itemTotal = 0;
  
    cart.forEach(item => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
  
      console.log(`Item: ${item.name}, Price: ${price}, Quantity: ${quantity}`);
  
      if (!isNaN(price) && !isNaN(quantity)) {
        itemTotal += price * quantity;
      } else {
        console.warn("Invalid price or quantity", { price, quantity });
      }
    });
  
    const deliveryCharge = 2.00;
    const subtotal = itemTotal + deliveryCharge;
  
    return { itemTotal, deliveryCharge, subtotal };
  };

  const { itemTotal, deliveryCharge, subtotal } = calculateSubtotal();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Cart</Text>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            <View style={styles.quantityButtons}>
              <TouchableOpacity onPress={() => incrementQuantity(index)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decrementQuantity(index)} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.cartTotal}>
        <Text style={styles.totalText}>Item Total: ${itemTotal.toFixed(2)}</Text>
        <Text style={styles.totalText}>Delivery: ${deliveryCharge.toFixed(2)}</Text>
        <Text style={styles.totalText}>Subtotal: ${subtotal.toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Location')} style={styles.checkoutButton}>
  <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#15113B',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cartItem: {
    backgroundColor: '#252866',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  itemPrice: {
    fontSize: 16,
    color: 'white',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#9ca3af',
  },
  quantityButtons: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  quantityButton: {
    backgroundColor: '#4b5563',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#9ca3af',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cartTotal: {
    marginTop: 16,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  checkoutButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});