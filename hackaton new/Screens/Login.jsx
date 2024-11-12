import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Image } from 'react-native-elements';

const BASE_URL = 'https://jwt-token-two.vercel.app';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, { email, password });
      if (response.status === 200) {
        const { token, message } = response.data;
        alert(message || 'Login successful!');
        navigation.navigate('Dashboard');
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error during login. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/food.png')}
        style={{ width: 100, height: 100, resizeMode: 'cover' }}
      />
      <Text style={styles.subheading}>Deliver Favourite Food</Text>

      <View style={styles.signupBox}> 
        <Text style={styles.heading}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="white"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            placeholderTextColor="white"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="white" style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleLogin}> 
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#15113B',
  },
  subheading: {
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
  },
  signupBox: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#0F0A2B',
    alignItems: 'center',
    marginVertical: 20,
  },
  heading: {
    fontSize: 30,
    color: 'white',  
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#1D102D',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#1D102D',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    color: 'white',
  },
  eyeIcon: {
    padding: 10,
  },
  signupButton: {  
    backgroundColor: '#1F266D',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'white',
  },
  linkText: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
  },
});

export default Login;  