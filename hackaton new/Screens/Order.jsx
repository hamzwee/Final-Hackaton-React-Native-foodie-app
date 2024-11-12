import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const OrderTrackingScreen = () => {
  const navigation = useNavigation();

  const [orderDetails, setOrderDetails] = useState({
    orderId: '4544882',
    orderDate: 'Today',
    steps: [
      { time: '04:30pm', status: 'Confirmed', completed: true },
      { time: '04:38pm', status: 'Processing', completed: true },
      { time: '04:42pm', status: 'On the way', completed: true },
      { time: '04:46pm', status: 'Delivered', completed: false },
    ],
    driver: {
      name: 'Mr Kemplas',
      deliveryTime: '25 minutes on the way',
      imageUrl: require('../assets/Profile.png'),
    },
  });

  const updateStepTime = () => {
    const updatedSteps = orderDetails.steps.map((step) => {
      if (!step.completed) {
        const currentTime = new Date();
        const incrementedTime = new Date(currentTime.getTime() - 5 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { ...step, time: incrementedTime };
      }
      return step;
    });

    setOrderDetails((prevState) => ({
      ...prevState,
      steps: updatedSteps,
    }));
  };

  useEffect(() => {
    const interval = setInterval(updateStepTime, 30000); 
    return () => clearInterval(interval); 
  }, [orderDetails]);

  const isDelivered = orderDetails.steps.some(
    (step) => step.status === 'Delivered' && !step.completed
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Track order</Text>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>Order ID : {orderDetails.orderId}</Text>
            <Text style={styles.orderDate}>{orderDetails.orderDate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.timeline}>
        {orderDetails.steps.map((step, index) => (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.timeText}>{step.time}</Text>
            <View style={styles.timelineContent}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: step.completed
                      ? 'white'
                      : 'rgba(255,255,255,0.5)',
                  },
                ]}
              />
              {index !== orderDetails.steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: step.completed
                        ? 'white'
                        : 'rgba(255,255,255,0.2)',
                    },
                  ]}
                />
              )}
            </View>
            <Text style={styles.statusText}>{step.status}</Text>
            {!step.completed && (
              <ActivityIndicator size="small" color="white" style={styles.loader} />
            )}
          </View>
        ))}
      </View>

      <View style={styles.driverCard}>
        <Image
          source={orderDetails.driver.imageUrl}
          style={styles.driverImage}
          resizeMode="cover"
        />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{orderDetails.driver.name}</Text>
          <Text style={styles.deliveryTime}>
            {orderDetails.driver.deliveryTime}
          </Text>
        </View>
      </View>

      {isDelivered && (
        <TouchableOpacity
          style={styles.backButtonHome}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a103d',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonHome: {
    margin: 20,
    padding: 16,
    backgroundColor: '#2b3990',
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  headerContent: {
    gap: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    color: 'white',
    opacity: 0.8,
  },
  orderDate: {
    color: 'white',
    opacity: 0.8,
  },
  timeline: {
    padding: 20,
    gap: 30,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  timeText: {
    width: 80,
    color: 'white',
    opacity: 0.8,
  },
  timelineContent: {
    alignItems: 'center',
    height: 40,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: 'white',
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  loader: {
    marginLeft: 10,
  },
  driverCard: {
    margin: 20,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverInfo: {
    gap: 4,
  },
  driverName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  deliveryTime: {
    color: 'white',
    opacity: 0.8,
  },
});

export default OrderTrackingScreen;