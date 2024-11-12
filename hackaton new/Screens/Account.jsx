import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Account = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15113B',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Account;