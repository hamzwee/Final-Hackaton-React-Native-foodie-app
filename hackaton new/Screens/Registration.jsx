import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Registration = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Icon name="home" size={100} color="#1E90FF" /> 
      
      <Text style={styles.welcomeText}>Welcome</Text> 
      
      <Text style={styles.p}>
        The easiest way to start with your amazing application.
      </Text>
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  p: {
    color: "black",
    textAlign: "center",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    color: '#1E90FF',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: '#1E90FF', 
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  signupButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    borderColor: '#1E90FF', 
    borderWidth: 1,
  },
  signupText: {
    color: '#1E90FF', 
    fontSize: 18,
  },
});

export default Registration;