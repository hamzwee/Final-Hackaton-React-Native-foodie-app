import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import About from './About'; 
import Contact from './Cart'; 
import Products from './Products';
import Icon from 'react-native-vector-icons/Ionicons';
import Account from './Account';
import Order from './Order';
import Cart from './Cart';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Browse" 
        component={About} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Carts" 
        component={Cart} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart-outline" size={size} color={color} />
          ),
        }} 
      />
    
      <Tab.Screen 
        name="Account" 
        component={Account} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default Dashboard;