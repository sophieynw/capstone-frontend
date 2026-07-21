import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import './global.css';
import { globalStyles } from './styles/globalStyles';
import { Image } from 'react-native';
import { useState } from 'react';
import api from './api';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/api/v1/auth/authenticate', { username, password });
      const { token } = response.data;

      //const userData = JSON.stringify({ userName, token });
      await SecureStore.setItemAsync('user_token', token);
      Alert.alert('Login successful', 'You have been logged in successfully.');
    } catch (error) {
      console.error('Login error', error);
      Alert.alert('Login failed', 'Invalid username or password.');
    }
  };

  return (
    <GluestackUIProvider mode="light">
      <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>RESTful Housekeeping</Text>
      <Text style={globalStyles.subtitle}>Cleaning accountability made simple</Text>

      <Image
        source={require('./assets/clean.png')}
        style={globalStyles.logoImage}/>

    <View style={globalStyles.card}>
      <Text>Email</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={username}
        onChangeText={setUsername}
      />

      <Text>Password</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Log In</Text>
      </Pressable>

      <Text style={globalStyles.link}>Find Password</Text>
    </View>

    <StatusBar style="auto" />
  </View>
</GluestackUIProvider>
  );
}